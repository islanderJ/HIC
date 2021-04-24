## Introduction

- The main task of this project is to configure a TLS server that could handle 2 way SSL. 
- Client certificates and server certificates were created. You can find how to create them. Look at app.js code for naming and paths.
- The server is configured to accept the given client ca certificate (cacert.pem). 
- When making client calls with curl, the server self signed certificate needs to be specified since it is not in the trusted domains.
    - This could be changed for production deployments. A domain name must be included and the hosting environment needs to have a certificate signed by a trusted source such as Let's Encrypt, DigiCert etc. so any client can recognize it.
    - The docker file could be deployed to a service such as AWS elastic beanstalk which can run the TLS server using AWS certificates and custom domains.

## Instructions

1. Project is created using Node.js runtime. The server is located at app.js.
2. This repository is configured to work on a local machine.
    - To run the server locally execute the following on the interview folder:
        - npm install
        - npm start
        - This will launch a node.js process running on port 9000.
    - More details on how to make client calls below.
3. A docker file can also be built to run the server on a container. Mapping of host port 9000 with container port 9000 is required. More details below.
4. All commands below are executed from the Interview directory.
5. Both endpoints can be access through the docker container or the express.js server.

## Hello endpoint v1

### First Test

`curl -v --cert-type p12 --cert ./client_certs/user1.p12:000user1 --request GET https://localhost:9000/v1/hello --cacert ./keys/server-crt.pem`

### Second Test

`curl -v --cert-type p12 --cert ./client_certs/user2.p12:000user2 --request GET https://localhost:9000/v1/hello --cacert ./keys/server-crt.pem`

## Hello endpoint v2

`curl -v --cert-type p12 --cert ./client_certs/user1.p12:000user1 --request POST https://localhost:9000/v2/hello --data "@payload.json" --header "Content-Type: application/json" --cacert ./keys/server-crt.pem`

## Building Docker File

`sudo docker build -t hic .`

## Running Docker File

`docker run -p 9000:9000 TLS`
