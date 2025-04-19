resource "aws_autoscaling_schedule" "eks-nodes-scale-to-zero" {
  for_each               = module.eks_cluster.eks_managed_node_groups_autoscaling_group_names
  scheduled_action_name  = "eks-nodes-scale-to-zero"
  min_size               = 0
  max_size               = 0
  desired_capacity       = 0
  recurrence             = var.cluster_scale_to_zero_recurrence
  start_time             = var.cluster_scale_to_zero_start_time
  end_time               = "2030-04-25T01:00:00Z"
  autoscaling_group_name = module.eks_cluster.eks_managed_node_groups_autoscaling_group_names[each.value]

  depends_on = [module.eks_cluster.eks_managed_node_groups_autoscaling_group_names]
}

resource "aws_autoscaling_schedule" "eks-nodes-scale-to-default" {
  count                  = length(module.eks_cluster.eks_managed_node_groups_autoscaling_group_names)
  scheduled_action_name  = "eks-nodes-scale-to-default"
  min_size               = 4
  max_size               = 4
  desired_capacity       = 4
  recurrence             = var.cluster_scale_to_default_recurrence
  start_time             = var.cluster_scale_to_default_start_time
  end_time               = "2030-04-25T09:00:00Z"
  autoscaling_group_name = module.eks_cluster.eks_managed_node_groups_autoscaling_group_names[count.index]
  depends_on             = [module.eks_cluster.eks_managed_node_groups_autoscaling_group_names]
}
