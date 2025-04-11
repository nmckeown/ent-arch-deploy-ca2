In your GitHub repo, create the following secrets under Settings > Secrets and variables > Actions:
- AZURE_CREDENTIALS: Output from az ad sp create-for-rbac --sdk-auth
- AZURE_SUBSCRIPTION_ID
- AZURE_RESOURCE_GROUP
- AKS_CLUSTER_NAME


 Notes
Replace ./charts/my-app with the path to your Helm chart.
Replace my-release with your preferred Helm release name.
Add any --set values or -f values.yaml options as needed.


### terraform
ARM_CLIENT_ID:	Azure Service Principal client ID
ARM_CLIENT_SECRET:	Azure Service Principal client secret
ARM_SUBSCRIPTION_ID:	Azure subscription ID
ARM_TENANT_ID:	Azure tenant ID




AZURE_CREDENTIALS – JSON output from:
az ad sp create-for-rbac --name "github-actions-aks" --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP> \
  --sdk-auth

AZURE_RG – your resource group name (e.g. myResourceGroup)
AKS_CLUSTER_NAME – your AKS cluster name (e.g. myAKSCluster)