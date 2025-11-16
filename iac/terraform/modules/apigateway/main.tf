data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

resource "aws_api_gateway_rest_api" "api" {
  name        = var.name
  description = var.description

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = var.tags
}

# Create resources for each microservice endpoint
resource "aws_api_gateway_resource" "microservice_resource" {
  for_each = {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  }

  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = each.value.path
}

# Create methods for each microservice endpoint
resource "aws_api_gateway_method" "microservice_method" {
  for_each = {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  }

  rest_api_id      = aws_api_gateway_rest_api.api.id
  resource_id      = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method      = each.value.method
  authorization    = "NONE"
  api_key_required = var.enable_api_key

  request_parameters = {
    "method.request.header.Content-Type"  = false
    "method.request.header.Authorization" = false
  }
}

# Create HTTP integrations for each microservice
resource "aws_api_gateway_integration" "microservice_integration" {
  for_each = {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  }

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method = aws_api_gateway_method.microservice_method[each.key].http_method

  type                    = "HTTP_PROXY"
  integration_http_method = each.value.method
  uri                     = each.value.backend_url
  timeout_milliseconds    = each.value.timeout

  request_parameters = {
    "integration.request.header.Content-Type"  = "method.request.header.Content-Type"
    "integration.request.header.Authorization" = "method.request.header.Authorization"
  }

  cache_key_parameters = var.enable_caching ? ["method.request.header.Authorization"] : []
}

# Method responses for microservices
resource "aws_api_gateway_method_response" "microservice_response" {
  for_each = {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  }

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method = aws_api_gateway_method.microservice_method[each.key].http_method
  status_code = "200"

  response_parameters = var.enable_cors ? {
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
  } : {}
}

# Integration responses for microservices
resource "aws_api_gateway_integration_response" "microservice_integration_response" {
  for_each = {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  }

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method = aws_api_gateway_method.microservice_method[each.key].http_method
  status_code = aws_api_gateway_method_response.microservice_response[each.key].status_code

  response_parameters = var.enable_cors ? {
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
    "method.response.header.Access-Control-Allow-Headers" = "'${join(",", var.cors_headers)}'"
    "method.response.header.Access-Control-Allow-Methods" = "'${join(",", var.cors_methods)}'"
  } : {}
}

# CORS OPTIONS method for each resource (if enabled)
resource "aws_api_gateway_method" "options_method" {
  for_each = var.enable_cors ? {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  } : {}

  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_integration" {
  for_each = var.enable_cors ? {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  } : {}

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method = aws_api_gateway_method.options_method[each.key].http_method

  type = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

resource "aws_api_gateway_method_response" "options_response" {
  for_each = var.enable_cors ? {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  } : {}

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method = aws_api_gateway_method.options_method[each.key].http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
  for_each = var.enable_cors ? {
    for endpoint in var.microservice_endpoints :
    "${endpoint.path}_${endpoint.method}" => endpoint
  } : {}

  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.microservice_resource[each.key].id
  http_method = aws_api_gateway_method.options_method[each.key].http_method
  status_code = aws_api_gateway_method_response.options_response[each.key].status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'${join(",", var.cors_headers)}'"
    "method.response.header.Access-Control-Allow-Methods" = "'${join(",", var.cors_methods)}'"
    "method.response.header.Access-Control-Allow-Origin"  = "'${join(",", var.cors_origins)}'"
  }
}

# CloudWatch Log Group for API Gateway
resource "aws_cloudwatch_log_group" "api_gateway_logs" {
  count             = var.enable_logging ? 1 : 0
  name              = "/aws/apigateway/${var.name}"
  retention_in_days = 14
  tags              = var.tags
}

# IAM Role for API Gateway CloudWatch Logs
resource "aws_iam_role" "api_gateway_cloudwatch_role" {
  count = var.enable_logging ? 1 : 0
  name  = "${var.name}-api-gateway-cloudwatch-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "api_gateway_cloudwatch_policy" {
  count      = var.enable_logging ? 1 : 0
  role       = aws_iam_role.api_gateway_cloudwatch_role[0].name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

# API Gateway Account
resource "aws_api_gateway_account" "api_gateway_account" {
  count               = var.enable_logging ? 1 : 0
  cloudwatch_role_arn = aws_iam_role.api_gateway_cloudwatch_role[0].arn
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    aws_api_gateway_method.microservice_method,
    aws_api_gateway_integration.microservice_integration,
    aws_api_gateway_method.options_method,
    aws_api_gateway_integration.options_integration,
  ]

  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_rest_api.api.body,
      var.microservice_endpoints
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# API Gateway Stage
resource "aws_api_gateway_stage" "stage" {
  deployment_id = aws_api_gateway_deployment.deployment.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = var.stage_name

  cache_cluster_enabled = var.enable_caching
  cache_cluster_size    = var.enable_caching ? var.cache_cluster_size : null

  xray_tracing_enabled = var.enable_tracing

  access_log_settings {
    destination_arn = var.enable_logging ? aws_cloudwatch_log_group.api_gateway_logs[0].arn : null
    format = var.enable_logging ? jsonencode({
      requestId        = "$context.requestId"
      ip               = "$context.identity.sourceIp"
      caller           = "$context.identity.caller"
      user             = "$context.identity.user"
      requestTime      = "$context.requestTime"
      httpMethod       = "$context.httpMethod"
      resourcePath     = "$context.resourcePath"
      status           = "$context.status"
      protocol         = "$context.protocol"
      responseLength   = "$context.responseLength"
      error            = "$context.error.message"
      integrationError = "$context.integration.error"
    }) : null
  }
  tags = var.tags
}

# Method Settings for logging
resource "aws_api_gateway_method_settings" "method_settings" {
  count       = var.enable_logging ? 1 : 0
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_stage.stage.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled        = true
    logging_level          = var.log_level
    data_trace_enabled     = var.log_level == "INFO"
    throttling_burst_limit = var.throttle_burst_limit
    throttling_rate_limit  = var.throttle_rate_limit
    caching_enabled        = var.enable_caching
  }
}

# API Key and Usage Plan (if enabled)
resource "aws_api_gateway_api_key" "api_key" {
  count = var.enable_api_key ? 1 : 0
  name  = var.api_key_name
  tags  = var.tags
}

resource "aws_api_gateway_usage_plan" "usage_plan" {
  count = var.enable_api_key ? 1 : 0
  name  = "${var.name}-usage-plan"

  api_stages {
    api_id = aws_api_gateway_rest_api.api.id
    stage  = aws_api_gateway_stage.stage.stage_name
  }

  throttle_settings {
    burst_limit = var.throttle_burst_limit
    rate_limit  = var.throttle_rate_limit
  }

  tags = var.tags
}

resource "aws_api_gateway_usage_plan_key" "usage_plan_key" {
  count         = var.enable_api_key ? 1 : 0
  key_id        = aws_api_gateway_api_key.api_key[0].id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.usage_plan[0].id
}