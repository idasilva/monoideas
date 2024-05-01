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

variable "aws_ebs_csi_driver_version" {
  description = "Amazon EBS CSI Driver version to use for the EKS cluster."
  type        = string
  default     = "v1.25.0-eksbuild.1"
}

variable "elastic_name" {
  type        = string
  description = "The name of application"
  default     = "eck-es"
}
