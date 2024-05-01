locals {
  cluster_name    = "eks-${terraform.workspace}"
  cluster_subnets = ["subnet-059217299d11646ca", "subnet-0b20bb9a4b4c17f7a"]
  cluster_subsnets_cirds = ["172.31.2.0/24", "172.31.0.0/24"]
  cluster_vpc_id  = "vpc-94f70cf2"
}

module "eks_cluster" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.20.0"

  cluster_name    = local.cluster_name
  cluster_version = "1.27"

  vpc_id                         = local.cluster_vpc_id
  subnet_ids                     = local.cluster_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"

  }

  eks_managed_node_groups = {
    spot = {
      name = "node-group-${terraform.workspace}"

      instance_types = ["t3.large", "c5.large"]

      min_size     = 1
      max_size     = 3
      desired_size = 3
      capacity_type = "SPOT"
    }
  }
}
