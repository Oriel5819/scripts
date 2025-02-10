# MINIKUBE

## INSTALLATION

1. follow the official documentation
2. use this to config the `minikube dashboard`

    ```bash
    kubectl proxy
    
    # port forwarding from the host maching to the vm machine called "regulus" accessible in port 2201
    ssh -L 1234:localhost:8001 regulus@127.0.0.1 -p 2201
    ```

## CONFIG