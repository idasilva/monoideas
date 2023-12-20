# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

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

variable "env" {
  description = "Cluster Environment"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "stage", "prod"], var.env)
    error_message = "Valid value is one of the following: dev, stage or prod."
  }
}



