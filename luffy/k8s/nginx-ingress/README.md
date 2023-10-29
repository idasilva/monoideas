Install ingress:

```
helm template ingress-nginx ingress-nginx \
--repo https://kubernetes.github.io/ingress-nginx \
--version 4.4.0 \
--namespace ingress-nginx \
> ./nginx-ingress.yaml
``````

Create new namespace:
```
kubectl create namespace ingress-nginx
```

Apply ingress controller
```
kubectl apply -f ./nginx-ingress.yaml
```



```
Acessar o ingress-controller diretamento no cluster:
k port-forward -n ingress-nginx svc/ingress-nginx-controller 7001:80

Monitorar logs do ingress-controller:
k logs ingress-nginx-controller-644cb4c66c-5s99z    -n ingress-nginx --follow

```