1. Install nodejs: https://nodejs.org/en/download/
   OR
   > choco install nodejs-lts

2. cd ./EAD_FE_CA2_2024 project folder

3. execute: npm install
 - This will use the content of the package.json file and install any needed dependencies into /node-modules folder

4. To run code locally type: node fe-server.js
 - Can access code on http://localhost:22137
 - 22137 can be changed in /config/config.json property "exposedPort"
 - The backend webservice must also be properly configured in /config/config.json.

# local test 
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install npm
node -v
npm -v
npm install
node fe-server.js

### Docker
docker build -t frontend:local .
docker build -t frontend:latest .

# docker push
docker image ls | grep frontend
docker login 
docker tag frontend:latest noelmckeown/frontend:latest
docker push noelmckeown/frontend:latest

# run frontend container 
docker run -d --name fe-test -i noelmckeown/frontend:latest /bin/bash

# run with env
docker run --env-file .env -d --name fe-test -i noelmckeown/frontend:latest /bin/bash

# check status
docker ps -a 

# exec to pod
docker exec -it fe-test bash 

# delete pod 
docker rm -f fe-test
