# K9S

## INSTALL

```
// install Kubectl

// install minikube

// connect to minikube ssh

minikube ssh

// or

minikube ip

ssh docker@ip
// username:docker
// password:tcuser
```

## minikube
```
// to check status
minikube status

// to launch cluster
minikube start --driver=<driverType>

// to stop cluster
minikube stop

// to delete cluster
minikube delete

// to connect to minikube docker
minikube ssh
// or
minikube ip
ssh docker@<minikube_ip>
password = tcuser

// to check docker in minikube
docker ps
crictl ps
```

## kubectl
```
// create alias for 
alias <alias_char_or_string>="kubernetes"

// check cluster information
kubectl cluster-info

// get nodes
kubectl get nodes

// get namespace
kubectl get ns
kubectl get namespace

```

## Pods
```
// get pods
kubectl get pods --namespace=<namespace_name>

// delete pod
kubectl delete pod <pod_name>

// running a pod
kubectl run <pod_name> --image=<image_name_from_docker_hub>

// describe a pod
kubectl describe pod <pod_name>
```

## deployment
```
// get deployments
kubectl get deploy
kubectl get deployments

// create deployment
kubectl create deployment <deployment_name> --image=<image_name_from_docker_hub>

// to describe deployment
kubectl describe deployment <deployment_name>

// to scale deployment
kubectl scale <deployment_name> --replicas=<number_of_replicas>

// exposing a deployment and create cluster IP service
kubectl expose deployment <deployment_name> --port=<external_port_only_inside_kube> --target-port=<internal_app_port>

// exposing a deployment and creating a NodePort service
kubectl expose deployment <deployment_name> --type=NodePort --port=<external_port>

// exposing a deployment and creating a LoadBalancer service
kubectl expose deployment <deployment_name> --type=LoadBalancer --port=<external_port>

// setting new image to an existing deployment
kubectl set image deployment <existing_deployment_name> <new_image_name_from_docker_hub>
kubectl rollout status deploy <deployment_name>
```

## services
creates a cluster IP in order to connect to the internal pods.

```
// get services
kubectl get svc
kubectl get services

// delete services
kubectl delete svc <service_name>

// launch service from outside of minikube
minikube service <service_name> [--url]
```

## delete all
```
kubectl delete all -all
```

## LAUNCH THROUGH FILE
```
// apply deployment
kubectl apply -f <deploymentFile1>.yaml -f <deploymentFile2>.yaml
```

## DELETE FILE
```
kubectl delete -f <deploymentFile1>.yaml -f <deploymentFile2>.yaml
```

## look up
```

```

can we get image from another repository??
a private or other platform


1. create app
2. create docker image
3. push to docker hub
4. create deployment from an image from docker hub
5. manipulate it inside kube
6. NodePort can be accessed from external host
