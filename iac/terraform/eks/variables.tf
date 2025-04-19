variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "ingress_namespace" {
  type    = string
  default = "ingress"
}

variable "aws_ebs_csi_driver_version" {
  description = "Amazon EBS CSI Driver version to use for the EKS cluster."
  type        = string
  default     = "v1.25.0-eksbuild.1"
}
