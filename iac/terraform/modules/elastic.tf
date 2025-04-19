resource "helm_release" "eck_operator" {
  name = "eck-operator"

  repository       = "https://helm.elastic.co"
  chart            = "eck-operator"
  namespace        = "elastic-system"
  create_namespace = true
  force_update     = true
}

resource "helm_release" "eck_stack" {
  name = "eck-stack"

  repository       = "https://helm.elastic.co"
  chart            = "eck-stack"
  namespace        = "elastic-system"
  create_namespace = true
  force_update     = true

  values = [<<EOF
  eck-elasticsearch:
    enabled: true
    annotations:
        eck.k8s.elastic.co/license: basic
    volumeClaimDeletePolicy: DeleteOnScaledownOnly
    http:
      tls:
        selfSignedCertificate:
          disabled: true
    nodeSets:
    - name: default
      count: 2
      config:
        node.store.allow_mmap: false
      podTemplate:
        spec:
          affinity:
            podAntiAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
              - labelSelector:
                  matchExpressions:
                  - key: common.k8s.elastic.co/type
                    operator: In
                    values:
                    - elasticsearch
                topologyKey: "kubernetes.io/hostname"
          initContainers:
          - name: sysctl
            securityContext:
              privileged: true
              runAsUser: 0
            command: ['sh', '-c', 'sysctl -w vm.max_map_count=262144']
          containers:
          - name: elasticsearch
            resources:
              limits:
                cpu: 2
                memory: 2.5Gi
              requests:
                cpu: 1
                memory: 2Gi
      volumeClaimTemplates:
      - metadata:
          name: elasticsearch-data
        spec:
          accessModes:
          - ReadWriteMany
          storageClassName: efs
          resources:
            requests:
              storage: 50Gi       
  eck-kibana:
    enabled: true
    annotations:
        eck.k8s.elastic.co/license: basic
    spec:
      count: 2
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: common.k8s.elastic.co/type
                operator: In
                values:
                - kibana
            topologyKey: "kubernetes.io/hostname"
      elasticsearchRef:
        name: elasticsearch
      http:
        tls:
          selfSignedCertificate:
            disabled: true
EOF
  ]
}
