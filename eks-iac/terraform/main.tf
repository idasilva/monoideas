# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

locals {
  cluster_name    = "eks-${var.env}"
  cluster_subnets = ["subnet-059217299d11646ca", "subnet-0b20bb9a4b4c17f7a"]
  cluster_vpc_id  = "vpc-94f70cf2"
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.15.3"

  cluster_name    = local.cluster_name
  cluster_version = "1.27"

  vpc_id                         = local.cluster_vpc_id
  subnet_ids                     = local.cluster_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"

  }

  eks_managed_node_groups = {
    one = {
      name = "node-group-${var.env}"

      instance_types = ["t3.small"]

      min_size     = 1
      max_size     = 3
      desired_size = 2
    }
  }
}

module "gitops-argocd" {
  source       = "./modules/gitops-argocd"
  kube-version = "36.2.0"
}

module "kube-prometheus" {
  source       = "./modules/kube-prometheus"
  kube-version = "36.2.0"
}

module "nginx-controller" {
  source       = "./modules/nginx-controller"
  kube-version = "36.2.0"
}

resource "null_resource" "kubectl" {
  depends_on = [module.eks]
  provisioner "local-exec" {
    command = "aws eks --region ${var.region} update-kubeconfig --name eks-${var.env}"
  }
}

resource "null_resource" "password" {
  depends_on = [module.gitops-argocd]
  provisioner "local-exec" {
    working_dir = "./"
    command     = "kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath={.data.password} | base64 -d > argocd-login.txt"
  }
}




