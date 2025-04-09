### Docker
docker build -t datastore:local .
docker build -t datastore:v1 .


# docker push
docker image ls | grep datastore
docker login 
docker tag datastore:v1 noelmckeown/datastore:v1
docker push noelmckeown/datastore:v1
