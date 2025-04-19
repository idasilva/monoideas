resource "helm_release" "kube-prometheus" {
  name             = "kube-prometheus-stackr"
  namespace        = var.prometheus_namespace
  create_namespace = true
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
}