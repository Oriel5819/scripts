# DOCKER

// to show all installed docker
sudo apt-cache policy docker*

// to check docker version
docker --version

// list all group
cat /etc/group

// to add your user in a docker group in order to avoid typing "sudo" in each docker command
sudo groupadd docker
sudo usermod -aG docker ${USER}
su - ${USER}


## IMAGES
// build an image
docker build -t <image_name>:<tags> (<dockerfile_path>) .

// to show all images 
docker image ls

// to see image content
docker run -it image_name sh
docker run -it --entrypoint sh image_name
docker image history --no-trunc image_name > image_history

// to delete an image
docker image rm <image_name>

// remove all images
docker rmi -f $(docker images -aq)

// to push image in docker hub
docker push docker_repository/docker_image_name

## CONTAINERS

// running an image and it becomes a container
docker run -v $(pwd):/<workdir_folder> -d -p <host_port>:<container_port> --name <image_name> <built_image_name> --env-file ./.env

// to show all the running containers
docker ps
docker ps -la
docker ps -a

// to stop a container
docker container stop <container_name>

// delete a container by force 
docker container rm <container_name> -f

// to open an exec bash for a specific container
docker exec -it <container_name> bash

// if bash does not work, use "sh"

// to log an errored container or running state
docker logs <container_id or container_name>

// remove all existing container
docker rm -vf $(docker ps -aq)

// to live tail logs
docker logs --follow <container>

## LOGING
docker login


// with pm2 add this in the package pm2 start code

--no-daemon


docker build -t acceptance-api-image .

docker run -d -p 5000:5000 -p 5050:5050 --name acceptance-api-container acceptance-api-image

docker exec -it acceptance-api-container bash

npx kill-port 8000

## ENVIRONMENT

```
FROM  node:20-bullseye

WORKDIR /app

COPY package.json .
COPY ./build ./

RUN npm install

# ENVIRONMENT
ENV PORT 5050 
ENV TZ Indian/Antananarivo

ENV AMQ_USER=alfred
ENV AMQ_SERVER=10.210.210.54
ENV AMQ_PASSWORD=4lfr3dP455

EXPOSE $PORT

CMD [ "node", "index.js"]
```

## Docker-compose


mongo --host 
 ctrl + M (change tab moves focus)


## EXAMPLES

### MySQL

```
docker run -d -p 3306:3306 --name local-mysql -e MYSQL_ROOT_PASSWORD=toor mysql
```

```
version: '3.8'

services:
  mysql:
    image: mysql:latest
    container_name: local-mysql
    environment:
      MYSQL_ROOT_PASSWORD: toor
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
  
```



## PUSH IMAGE IN REGISTRY

### Build the image

```bash
docker build -t <image_name> <docker_file_path>

example:
	docker build -t monitoring-image .
```

### Login to the docker image registry

```bash
docker login
```

### Tag the image

```bash
docker [image] tag <current_image_name><current_image_tag> <registry_name><new_image_name><new_image_tag>

example:
	docker tag monitoring-alerter-client-side-image:latest orielreg/monitoring-alerter-client-side-image:v1
```

### Push the image

```bash
# for typescript, do not forget to build before pushing the image

docker [image] push <registry_name>/<image_name>:<image_tag>

example:
	docker image push orielreg/monitoring-alerter-client-side-image:v1
```

### Pull image

```bash
docker pull <image_name>:<image_tag>

example:
	docker pull orielreg/monitoring-alerter-client-side-image:v1
```

