# Kubernetes - Setup

Kubernetes +  RHEL 7.* + CONTAINERD

### Set hostname

```bash
hostnamectl set-hostname [name]
```

### Módulos do Kernel

Verificar se os módulos do *kernel* estão habilitados

```bash
for m in br_netfilter ip_vs_rr ip_vs_wrr ip_vs_sh nf_conntrack_ipv4 ip_vs; do
    lsmod | awk '{print $1}' | grep -w $m || echo "$m ***not found***";
done
#br_netfilter
#ip_vs_rr ***not found***
#ip_vs_wrr
#ip_vs_sh
#nf_conntrack_ipv4
#ip_vs
# Module aufs not found.
```

#### Habilitar os módulos imediatamente sem *reboot*

```bash
modprobe br_netfilter
modprobe ip_vs_rr
modprobe ip_vs_wrr
modprobe ip_vs_sh
modprobe nf_conntrack_ipv4
modprobe ip_vs
```

#### Habilitar os módulos permanentemente após o *reboot*

```bash
vim /etc/modules-load.d/k8s.conf
br_netfilter
ip_vs_rr
ip_vs_wrr
ip_vs_sh
nf_conntrack_ipv4
ip_vs
```

### SELinux

Verificar se o SELinux esta desabilitado ou em modo permissivo

```bash
sestatus
#SELinux status:                 enabled
#SELinuxfs mount:                /sys/fs/selinux
#SELinux root directory:         /etc/selinux
#Loaded policy name:             targeted
#Current mode:                   permissive
#Mode from config file:          enforcing
#Policy MLS status:              enabled
#Policy deny_unknown status:     allowed
#Max kernel policy version:      31

getenforce
#Permissive
```

Desabilitar o SELinux

```bash
setenforce 0
```

Desabilitar o SELinux permanentemente

```bash
sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux
```

Se não for possível desabilitar o SELinux, é possível alterar o modo para permissivo

```bash
sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=permissive/g' /etc/sysconfig/selinux
```

### Swap

Verificar se a *swap* esta desabilitada

```bash
swapon -v

#ou

cat /proc/swaps
```

Desabilitar *swap*

```bash
swapoff -a
```

Desabilitar *swap* permanentemente

```bash
vim /etc/fstab
# comentar a linha do swap
```

### Firewall

Verificar se o *firewall* esta desabilitado

```bash
systemctl status firewalld
#firewalld.service - firewalld - dynamic firewall daemon
#  Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
#  Active: inactive (dead)
#    Docs: man:firewalld(1)
```

Desabilitar o *firewall*

```bash
systemctl stop firewalld
```

Desabilitar o *firewall* permanentemente

```bash
systemctl disable firewalld
```

Se não for possível desabilitar o *firewall*, as seguintes portas devem ser liberadas

### Parâmetros do Kernel

Configurar parâmetros do *kernel* no *sysctl*

```bash
vim /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
```

```bash
sysctl --system
```

## Instalar Kubernetes

Adicionar o repositório do Kubernetes no RHEL:

```bash
vim /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
```

Instalar os pacotes do Kubernetes:

```bash
yum install -y kubelet kubeadm kubectl wget bash-completion
```

```bash
yum install -y kubelet-1.15.3-0 kubeadm-1.15.3-0 kubectl-1.15.3-0 wget bash-completion
# yum install -y kubeadm-1.15.3-0 --disableexcludes=kubernetes
```

Habilitar e iniciar o serviço do *kubelet*:

```bash
systemctl enable kubelet
```

## Instalar Containerd

Baixar e descompactar o *containerd*:

```bash
curl -o containerd-1.2.6.linux-amd64.tar.gz -L https://github.com/containerd/containerd/releases/download/v1.2.6/containerd-1.2.6.linux-amd64.tar.gz
tar xf containerd-1.2.6.linux-amd64.tar.gz -C /usr/local/
```

```bash
curl -o containerd-1.3.2.linux-amd64.tar.gz -L https://github.com/containerd/containerd/releases/download/v1.3.2/containerd-1.3.2.linux-amd64.tar.gz
tar xf containerd-1.3.2.linux-amd64.tar.gz -C /usr/local/
```

Baixar o arquivo para utilizar o *containerd* como um serviço do *systemctl*

```bash
curl -o /etc/systemd/system/containerd.service https://raw.githubusercontent.com/containerd/cri/master/contrib/systemd-units/containerd.service
```

Recarregar as configurações do systemctl, após habilitar e iniciar o serviço do *containerd*

```bash
systemctl daemon-reload
systemctl enable containerd
systemctl start containerd
```

## Instalar Runc

Baixar e conceder permissão para o binário do *runc*

```bash
curl -L -o /usr/local/sbin/runc https://github.com/opencontainers/runc/releases/download/v1.0.0-rc8/runc.amd64
chmod 755 /usr/local/sbin/runc
```

## Configurar Crictl

Configurar o *crictl* (container runtime interface) para utilizar o *containerd* como container runtime

```bash
echo "runtime-endpoint: unix:///run/containerd/containerd.sock" > /etc/crictl.yaml
```

## Configurar Kubelet

Criar o arquivo de configuração do *kubelet* para o mesmo utilizar o *containerd* como container runtime:

```bash
mkdir -p /etc/systemd/system/kubelet.service.d

Recarregar as configurações do systemctl, após reiniciar o serviço do *kubelet*

```bash
systemctl daemon-reload
systemctl restart kubelet
```

## AutoComplete

Instalar o auto-completar do Kubernetes

```bash
source <(kubectl completion bash)
echo "source <(kubectl completion bash)" >> ~/.bashrc

alias k=kubectl
complete -o default -F __start_kubectl k
```
- https://kubernetes.io/pt-br/docs/reference/kubectl/cheatsheet/

Recarregar as configurações do systemctl, após reiniciar o serviço do *containerd*

```bash
systemctl daemon-reload
systemctl restart containerd
```

## Configuração do Cluster Kubernetes

---

### Master

Iniciar o cluster utilizando o *containerd*

```bash
kubeadm init --cri-socket unix:///run/containerd/containerd.sock --apiserver-advertise-address $(hostname -i) --service-cidr 15.96.0.0/12 --pod-network-cidr 15.32.0.0/12
```

Copiar as configurações para o local padrão

```bash
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config
```

Criar o podnetwork (weave net)

```bash
#setar http_proxy e https_proxy, se necessário
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"

## OU alterando o range de ip dos pods

kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')&env.IPALLOC_RANGE=15.32.0.0/12"
```

### Workers

```bash
kubeadm join 172.31.87.154:6443 --token 331t4a.ipefoyq653773drh \
--discovery-token-ca-cert-hash sha256:bf322a8f9ff54be34bd58f2c57a2d58e504ab7c7e84fd1fdd2dad26052f222e7 --cri-socket /run/containerd/containerd.sock
```

 Gerar o token novo, execute no master:

```bash
kubeadm token create --print-join-command
```


### Usefull commands to work with Kubernetes on your Daily Work:
- https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-ingress-em-

### Master Node as Worker Node(Is not recommended):

Caso o master node (control plane) também tenha que ser um worker node, ou seja, que passe a receber Pods pelo scheduler do cluster:

```bash
kubectl taint nodes node1 node-role.kubernetes.io/master-
```
(o sinal "-" ao final do comando instrui o kubectl a remover o taint)

Para desfazer o passo e voltar a ter um control plane sem schedule:

```bash
kubectl taint nodes node1 node-role.kubernetes.io/master:NoSchedule
```

Validar se a taint `node-role.kubernetes.io/master:NoSchedule` está presente:

```bash
kubectl describe node node1  | grep -i taint
```

```bash
[root@node1 ~]# kubectl describe node node1 | grep -i taint
Taints:             node-role.kubernetes.io/master:NoSchedule
```
