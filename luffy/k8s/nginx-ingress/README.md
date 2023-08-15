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


