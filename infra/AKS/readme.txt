#
## Create AKS 
#

# login
az login

# list locations
az account list-locations

# create resource group
az group create --name eadca2rg --location northeurope

# create public IP
az network public-ip create \
  --resource-group eadca2rg \
  --name EADCA2AKSOutboundIP \
  --sku standard \
  --allocation-method static

# create AKS cluster
az aks create \
  --resource-group eadca2rg \
  --name EADCA2AKS \
  --node-count 2 \
  --node-vm-size Standard_B2s \
  --enable-addons monitoring \
  --generate-ssh-keys \
  --load-balancer-outbound-ips EADCA2AKSOutboundIP

# aks update (ignore)
az aks update --name EADCA2AKS --node-count 2 --resource-group eadca2rg

# get crendentials
az aks get-credentials --resource-group eadca2rg --name EADCA2AKS
Merged "EADCA2AKS" as current context in /home/nmckeown/.kube/config

# validate
$ kc get nodes
NAME                                STATUS   ROLES    AGE     VERSION
aks-nodepool1-74257614-vmss000000   Ready    <none>   4m2s    v1.31.7
aks-nodepool1-74257614-vmss000001   Ready    <none>   4m19s   v1.31.7

# apply
kubectl apply -f k8s/


#
### Firewall
# 

# get AKS outbound IP
az aks show \
  --resource-group eadca2rg \
  --name EADCA2AKS \
  --query "networkProfile.outboundIPs.publicIPs" \
  --output tsv

az aks show \
  --resource-group eadca2rg \
  --name EADCA2AKS \
  --query "networkProfile.loadBalancerProfile.effectiveOutboundIPs[*].ipAddress" \
  --output tsv

# check outbound type 
az aks show \
  --resource-group eadca2rg \
  --name EADCA2AKS \
  --query "networkProfile.outboundType"

# create public IP
az network public-ip create \
  --resource-group eadca2rg \
  --name EADCA2AKSOutboundIP \
  --sku standard \
  --allocation-method static

# get public IP resource ID
az network public-ip show \
  --resource-group eadca2rg \
  --name EADCA2AKSOutboundIP \
  --query "id" \
  --output tsv

# returns 
/subscriptions/9ec68712-3805-4cf9-a4c1-4e5951df302b/resourceGroups/eadca2rg/providers/Microsoft.Network/publicIPAddresses/EADCA2AKSOutboundIP

# update AKS to use public IP
az aks update \
  --resource-group eadca2rg \
  --name EADCA2AKS \
  --load-balancer-outbound-ips "/subscriptions/9ec68712-3805-4cf9-a4c1-4e5951df302b/resourceGroups/eadca2rg/providers/Microsoft.Network/publicIPAddresses/EADCA2AKSOutboundIP"

# verify 
az aks show \
  --resource-group eadca2rg \
  --name EADCA2AKS \
  --query "networkProfile.loadBalancerProfile.effectiveOutboundIPs[*].ipAddress"

Add IP(s) to MongoDB Atlas Firewall
Go to MongoDB Atlas
Navigate to your Project > Network Access
Click “Add IP Address”
Add the AKS public IP address(es) from Step 1
Optional: Add a description like AKS Cluster Access
Click Confirm


#
## Delete 
#
az group delete --name eadca2rg --yes --no-wait
az aks delete --resource-group eadca2rg --name EADCA2AKS --yes
az network public-ip delete --resource-group eadca2rg --name EADCA2AKSOutboundIP --yes



#
## Fix Missing Registration
#
(MissingSubscriptionRegistration) The subscription is not registered to use namespace 'Microsoft.ContainerService'. See https://aka.ms/rps-not-found for how to register subscriptions.
Code: MissingSubscriptionRegistration


az provider register --namespace Microsoft.ContainerService
Registering is still on-going. You can monitor using 'az provider show -n Microsoft.ContainerService'

# check registration
az provider list --query "[?registrationState=='Registered']" --output table