data "aws_caller_identity" "current" {}

data "aws_eks_cluster" "cluster" {
  name = "eks-spot-dev"
}

resource "aws_efs_file_system" "efs" {
  creation_token   = "${terraform.workspace}-data-efs"
  performance_mode = "generalPurpose"

  lifecycle_policy {
    transition_to_ia = "AFTER_60_DAYS"
  }

  tags = {
    Name        = "${terraform.workspace}-data-efs"
    Environment = terraform.workspace
  }
}

resource "aws_security_group" "efs" {
  name        = "${terraform.workspace}-efs-sg"
  description = "Allow inbound efs traffic from Kubernetes Subnet"
  vpc_id      = local.cluster_vpc_id

  ingress {
    cidr_blocks = local.cluster_subsnets_cirds
    from_port   = 2049
    to_port     = 2049
    protocol    = "tcp"
  }

  egress {
    cidr_blocks = local.cluster_subsnets_cirds
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }
}

resource "aws_efs_mount_target" "efs_mount_target" {
  count           = length(local.cluster_subnets)
  file_system_id  = aws_efs_file_system.efs.id
  subnet_id       = local.cluster_subnets[count.index]
  security_groups = [aws_security_group.efs.id]
}

resource "helm_release" "aws_efs_csi_driver" {
  chart      = "aws-efs-csi-driver"
  name       = "aws-efs-csi-driver"
  namespace  = "kube-system"
  repository = "https://kubernetes-sigs.github.io/aws-efs-csi-driver/"
  values = [<<EOF
controller:
  serviceAccount:
    create: true
    name: efs-csi-controller-sa
    annotations:
      "eks.amazonaws.com/role-arn": "${module.attach_efs_csi_role.iam_role_arn}"
storageClasses:
  - name: efs
    annotations:
      storageclass.kubernetes.io/is-default-class: "true"
    mountOptions:
    - tls
    parameters:
      provisioningMode: efs-ap
      fileSystemId: "${aws_efs_file_system.efs.id}"
      directoryPerms: "700"
      gidRangeStart: "1000"
      gidRangeEnd: "2000"
      basePath: "/data"
      ensureUniqueDirectory: "true"
    reclaimPolicy: Retain
    volumeBindingMode: WaitForFirstConsumer  
    
EOF
  ]

  depends_on = [aws_efs_file_system.efs]
}

module "attach_efs_csi_role" {
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"

  role_name             = "efs-csi"
  attach_efs_csi_policy = true

  oidc_providers = {
    ex = {
      provider_arn               = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/${replace(data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer, "https://", "")}"
      namespace_service_accounts = ["kube-system:efs-csi-controller-sa"]
    }
  }
}
