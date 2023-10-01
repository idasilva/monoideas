# Monitoring 

### Prometheus
```
    git clone https://github.com/prometheus-operator/kube-prometheus
    cd kube-prometheus
    kubectl create -f manifests/setup
    k get customresourcedefinitions
    kubectl create -f manifests  
```

### Fluentbit
```
    helm repo add  fluent https://fluent.github.io/helm-charts
    helm install fluent-bit  fluent/fluent-bit 
```


