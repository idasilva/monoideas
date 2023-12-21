resource "helm_release" "sonarqube" {
  chart            = "sonarqube"
  repository       = "https://SonarSource.github.io/helm-chart-sonarqube"
  name             = "sonarqube"
  version          = "10.3.0"
  namespace        = var.sonar_namespace
  create_namespace = true
  recreate_pods    = true
  depends_on = [module.eks_cluster]
}
