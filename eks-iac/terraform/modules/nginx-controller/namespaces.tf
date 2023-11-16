resource "kubernetes_namespace" "ingress" {  
  metadata {
    name = var.namespace
  }
}