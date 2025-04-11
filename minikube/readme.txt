# install
sudo apt update
sudo apt install -y curl wget apt-transport-https ca-certificates conntrack
sudo apt install -y docker.io
sudo usermod -aG docker $USER
newgrp docker  # or restart your shell
curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# verify / start
minikube version
minikube start --driver=docker
minikube status
kubectl get nodes
minikube dashboard

# autocomplete for kubectl
echo "source <(kubectl completion bash)" >> ~/.bashrc

###### live checks

$ minikube version
minikube version: v1.35.0
commit: dd5d320e41b5451cdf3c01891bc4e13d189586ed-dirty

$ minikube start --driver=docker
😄  minikube v1.35.0 on Ubuntu 22.04
✨  Using the docker driver based on user configuration
📌  Using Docker driver with root privileges
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.46 ...
💾  Downloading Kubernetes v1.32.0 preload ...
    > preloaded-images-k8s-v18-v1...:  333.57 MiB / 333.57 MiB  100.00% 4.60 Mi
    > gcr.io/k8s-minikube/kicbase...:  500.31 MiB / 500.31 MiB  100.00% 5.31 Mi
🔥  Creating docker container (CPUs=2, Memory=32100MB) ...
❗  Failing to connect to https://registry.k8s.io/ from inside the minikube container
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
🐳  Preparing Kubernetes v1.32.0 on Docker 27.4.1 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

$ minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

$ kubectl get nodes
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   75s   v1.32.0

# get frontend URL
minikube service frontend -n recipetracker
|---------------|----------|-------------|---------------------------|
|   NAMESPACE   |   NAME   | TARGET PORT |            URL            |
|---------------|----------|-------------|---------------------------|
| recipetracker | frontend |        9000 | http://192.168.49.2:32227 |
|---------------|----------|-------------|---------------------------|
🎉  Opening service recipetracker/frontend in default browser...


### all resources in recipetracker ns 

$ kc -n recipetracker get all
NAME                            READY   STATUS    RESTARTS   AGE
pod/backend-85d6c9fd89-8swgr    1/1     Running   0          30m
pod/frontend-579d68ffd7-c8t99   1/1     Running   0          30m
pod/frontend-579d68ffd7-m4f4b   1/1     Running   0          48s

NAME               TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/backend    ClusterIP      10.109.214.212   <none>        8080/TCP         30m
service/frontend   LoadBalancer   10.98.189.116    <pending>     9000:32227/TCP   30m

NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/backend    1/1     1            1           30m
deployment.apps/frontend   2/2     2            2           30m

NAME                                  DESIRED   CURRENT   READY   AGE
replicaset.apps/backend-85d6c9fd89    1         1         1       30m
replicaset.apps/frontend-579d68ffd7   2         2         2       30m

NAME                                               REFERENCE             TARGETS              MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/frontend-hpa   Deployment/frontend   cpu: <unknown>/50%   2         10        2          63s
