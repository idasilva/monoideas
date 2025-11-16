variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "name" {
  type    = string
  default = "bes-innovation"
}

variable "capacity_providers" {
  type        = list(any)
  description = "A lista dos capacity providers que serão permitidos no cluster fargate"
  default = [
    "FARGATE_SPOT"
  ]
}