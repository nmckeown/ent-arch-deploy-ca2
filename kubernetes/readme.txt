#  Create a Docker Registry Secret

kubectl create secret docker-registry regcred \
  --docker-username=your_dockerhub_username \
  --docker-password=your_password_or_access_token \
  --docker-email=you@example.com


# was getting error
Warning  Failed     22s                kubelet            Failed to pull image "noelmckeown/frontend:latest": Error response from daemon: Get "https://registry-1.docker.io/v2/": dial tcp: lookup registry-1.docker.io on 192.168.49.1:53: read udp 192.168.49.2:45007->192.168.49.1:53: i/o timeout

# had add google DNS
sudo vi /etc/resolv.conf
nameserver 8.8.8.8
nameserver 8.8.4.4

# restart services
sudo systemctl restart docker
sudo systemctl daemon-reload

# only leave google DNS
$ sudo cat /etc/docker/daemon.json 
{
  "bip": "100.121.21.1/24",
  "dns": ["10.5.100.12", "10.2.33.6", "8.8.8.8"]
}


# create pods 
kubectl apply -f frontend.yaml
kubectl apply -f backend.yaml

# encode secret
echo -n 'mongodb+srv://user:pass@cluster.mongodb.net/dbname' | base64

# apply all configs 
kubectl apply -f k8s/


# access frontend 
$ minikube service frontend
|-----------|----------|-------------|---------------------------|
| NAMESPACE |   NAME   | TARGET PORT |            URL            |
|-----------|----------|-------------|---------------------------|
| default   | frontend |          80 | http://192.168.49.2:30580 |
|-----------|----------|-------------|---------------------------|
🎉  Opening service default/frontend in default browser...
