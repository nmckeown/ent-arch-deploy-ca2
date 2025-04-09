1. execute: mvnw spring-boot:run
 - This will compile and run the web service using the properties defined in application.properties (located in src/main/resources).

4. It can be accessed on http://localhost:8080
 - 22137 can be changed in /config/config.json property "exposedPort"
 - The following 4sample microservices have been implemented:
	-- Test app works:  	(GET) /
	-- Get all recipes: 	(GET) /recipes
	-- Add recipe: 		(POST) /recipe
	-- Delete recipe: 	(DELETE) /recipe/{name}

# install maven
sudo apt update
sudo apt install maven
mvn -version

# install mongodb 
mongod --version

# set variables 
export MONGODB_CONN="mongodb+srv://noelmckeown:6AyLHYGkoco1@ent-arch-deploy-ca2-mon.bnofefg.mongodb.net/?retryWrites=true&w=majority&appName=ent-arch-deploy-ca2-mongo"
export MONGODB_URI="mongodb+srv://noelmckeown:6AyLHYGkoco1@ent-arch-deploy-ca2-mon.bnofefg.mongodb.net/"

# local test
mvn -N io.takari:maven:wrapper
chmod +x mvnw
./mvnw spring-boot:run

# local docker test
java -jar app.jar

# update java 
java -version
sudo apt update
sudo apt install openjdk-17-jdk

### Docker
docker build -t backend:local .
docker build -t backend:latest .

# docker push
docker image ls | grep backend
docker login 
docker tag backend:latest noelmckeown/backend:latest
docker push noelmckeown/backend:latest

# run local backend container 
docker run -d --name be-test -i backend:latest /bin/bash

# run remote backend container 
docker run -d --name be-test -i noelmckeown/backend:latest /bin/bash

# check status
docker ps -a 

# exec to pod
docker exec -it be-test bash 

# check logs
docker logs be-test 

# delete pod 
docker rm -f be-test
