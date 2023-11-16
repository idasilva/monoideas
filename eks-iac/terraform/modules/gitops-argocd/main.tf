resource "helm_release" "argocd" {
  name       = "argocd"
  chart      = "argo-cd"
  repository = "https://argoproj.github.io/argo-helm"
  version    = "5.27.3"
  # namespace  = var.namespace
  timeout    = "1200"
}


resource "null_resource" "password" {
  provisioner "local-exec" {
    working_dir = "./"
    command     = "kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath={.data.password} | base64 -d > argocd-login.txt"
  }
}
