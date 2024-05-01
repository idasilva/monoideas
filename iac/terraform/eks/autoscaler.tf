resource "helm_release" "cluster_autoscaler" {
  name             = "cluster-autoscaler"
  chart            = "cluster-autoscaler"
  repository       = "https://kubernetes.github.io/autoscaler"
  version          = "9.36.0"
  namespace        = "cluster-autoscaler"
  create_namespace = true

  values = [<<EOF
cloudProvider: aws
awsRegion: sa-east-1
autoDiscovery:
  clusterName: ${module.eks_cluster.cluster_name}
awsAccessKeyID: XPTO
awsSecretAccessKey: XPTO

EOF
  ]

  depends_on = [module.eks_cluster]
}
