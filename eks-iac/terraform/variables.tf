# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

variable "region" {
  description = "AWS region"
  type        = string
  default     = "sa-east-1"
}

variable "kube_config" {
  type    = string
  default = "~/.kube/config"
}

variable "namespace" {
  type    = string
  default = "monitoring"
}

variable "kube-version" {
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



