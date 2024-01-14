variable "region" {
  description = "AWS region"
  type        = string
  default     = "sa-east-1"
}

variable "ingress_namespace" {
  type    = string
  default = "ingress"
}

variable "sonar_namespace" {
  type    = string
  default = "sonarqube"
}

variable "prometheus_namespace" {
  type    = string
  default = "monitoring"
}

variable "argocd_namespace" {
  type    = string
  default = "monitoring"
}




