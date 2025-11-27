locals {
  cluster_name = terraform.workspace
}


module "eks_cluster" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.24"

  cluster_name    = local.cluster_name
  cluster_version = "1.32"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"
  }

  eks_managed_node_groups = {
    spot = {
      name = "${terraform.workspace}"

      instance_types = ["t2.xlarge", "t3.large", "c5.large", "m7a.xlarge"]

      min_size      = 1
      max_size      = 3
      desired_size  = 3
      capacity_type = "SPOT"
    }
  }
  depends_on = [module.vpc]
}
