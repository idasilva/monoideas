variable "name" {
  description = "Name for the API Gateway"
  type        = string
}

variable "description" {
  description = "Description for the API Gateway"
  type        = string
  default     = "API Gateway created by Terraform"
}

variable "stage_name" {
  description = "Stage name for the API Gateway deployment"
  type        = string
  default     = "prod"
}

variable "microservice_endpoints" {
  description = "List of microservice endpoints to integrate with"
  type = list(object({
    path        = string
    method      = string
    backend_url = string
    timeout     = optional(number, 29000)
    cache_ttl   = optional(number, 0)
  }))
  default = []
}

variable "enable_cors" {
  description = "Enable CORS for the API Gateway"
  type        = bool
  default     = true
}

variable "cors_origins" {
  description = "Allowed origins for CORS"
  type        = list(string)
  default     = ["*"]
}

variable "cors_methods" {
  description = "Allowed methods for CORS"
  type        = list(string)
  default     = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}

variable "cors_headers" {
  description = "Allowed headers for CORS"
  type        = list(string)
  default     = ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key", "X-Amz-Security-Token"]
}

variable "enable_api_key" {
  description = "Enable API key requirement"
  type        = bool
  default     = false
}

variable "api_key_name" {
  description = "Name for the API key"
  type        = string
  default     = "default-api-key"
}

variable "throttle_burst_limit" {
  description = "Throttle burst limit"
  type        = number
  default     = 5000
}

variable "throttle_rate_limit" {
  description = "Throttle rate limit"
  type        = number
  default     = 2000
}

variable "enable_logging" {
  description = "Enable API Gateway logging"
  type        = bool
  default     = true
}

variable "log_level" {
  description = "Log level for API Gateway"
  type        = string
  default     = "INFO"
  validation {
    condition     = contains(["OFF", "ERROR", "INFO"], var.log_level)
    error_message = "Log level must be one of: OFF, ERROR, INFO."
  }
}

variable "enable_tracing" {
  description = "Enable X-Ray tracing"
  type        = bool
  default     = false
}

variable "enable_caching" {
  description = "Enable API Gateway caching"
  type        = bool
  default     = false
}

variable "cache_cluster_size" {
  description = "Cache cluster size"
  type        = string
  default     = "0.5"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}