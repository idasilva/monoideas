resource "helm_release" "ingress" {
  name             = "ingress"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  version          = "4.5.2"
  create_namespace = true
  namespace        = var.ingress_namespace

  depends_on = [module.eks_cluster]
}
