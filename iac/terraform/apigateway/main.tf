module "apigateway" {
  source = "../modules/apigateway"

  name        = "itera-development"
  description = "Development API Gateway for testing"
  stage_name  = "development"

  microservice_endpoints = [
    {
      path        = "auth"
      method      = "POST"
      backend_url = "https://api.balanco.dev.itera.ai/api/auth"
      timeout     = 29000
    },
    {
      path        = "history"
      method      = "GET"
      backend_url = "https://api.balanco-history.dev.itera.ai/api/data"
      timeout     = 29000
    }
  ]

  # Permissive CORS for development
  enable_cors  = true
  cors_origins = ["*"]
  cors_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]

  enable_api_key = false

  throttle_burst_limit = 1000
  throttle_rate_limit  = 500

  enable_logging = true
  log_level      = "INFO"
  enable_tracing = true

  enable_caching = false

  tags = {
    Environment = "development"
    Project     = "microservices"
    Team        = "backend"
    ManagedBy   = "terraform"
  }
}