resource "helm_release" "argocd" {
  name             = "argocd"
  chart            = "argo-cd"
  repository       = "https://argoproj.github.io/argo-helm"
  version          = "5.27.3"
  namespace        = var.argocd_namespace
  create_namespace = true
  timeout          = "1200"
}