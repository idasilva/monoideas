output "api_gateway_id" {
  description = "ID of the API Gateway"
  value       = aws_api_gateway_rest_api.api.id
}

output "api_gateway_name" {
  description = "Name of the API Gateway"
  value       = aws_api_gateway_rest_api.api.name
}

output "api_gateway_arn" {
  description = "ARN of the API Gateway"
  value       = aws_api_gateway_rest_api.api.arn
}

output "api_gateway_execution_arn" {
  description = "Execution ARN of the API Gateway"
  value       = aws_api_gateway_rest_api.api.execution_arn
}

# output "api_gateway_url" {
#   description = "URL of the API Gateway"
#   value       = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${data.aws_region.current.region}.amazonaws.com/${var.stage_name}"
# }

output "api_gateway_stage_name" {
  description = "Stage name of the API Gateway"
  value       = aws_api_gateway_stage.stage.stage_name
}

output "api_key_id" {
  description = "ID of the API Key (if enabled)"
  value       = var.enable_api_key ? aws_api_gateway_api_key.api_key[0].id : null
}

output "api_key_value" {
  description = "Value of the API Key (if enabled)"
  value       = var.enable_api_key ? aws_api_gateway_api_key.api_key[0].value : null
  sensitive   = true
}

output "usage_plan_id" {
  description = "ID of the Usage Plan (if API key is enabled)"
  value       = var.enable_api_key ? aws_api_gateway_usage_plan.usage_plan[0].id : null
}

# output "microservice_endpoints" {
#   description = "List of configured microservice endpoints"
#   value = {
#     for endpoint in var.microservice_endpoints :
#     "${endpoint.path}_${endpoint.method}" => {
#       path        = endpoint.path
#       method      = endpoint.method
#       backend_url = endpoint.backend_url
#       api_url     = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${data.aws_region.current.region}.amazonaws.com/${var.stage_name}/${endpoint.path}"
#     }
#   }
# }