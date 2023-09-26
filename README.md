# token-generator
This project consists of 3 parts
1)frontend

2)Generator MicroService

3)Validator MicroService

# Pre Requisities
Please download and install the following.

# Java
Install Java on the system set the bin path
https://www.oracle.com/uk/java/technologies/downloads/#jdk17-windows
Set path in environment variable
Set path for example like this C:\Program Files\Java\jdk-17\bin

# Maven
Install Maven on the system set the maven path 
https://maven.apache.org/download.cgi 
Set path in environment variable
Set path for example like this C:\ProgramData\chocolatey\lib\maven\apache-maven-3.9.3\bin

# node js
Install nodejs and npm set nodejs path.
https://nodejs.org/en/download
Set Path For example C:\Program Files\nodejs\

# Steps in the script.sh and script*.bat files
1)run the generator service in port 8082
2)run the validator service in port 8081
3)run the front end using npm run start.

# Troubleshooting steps
1)running the steps may fail for a new system we need to install nodejs,npm,java and maven
2)In case we are getting the port already in use
https://stackoverflow.com/questions/39632667/how-do-i-remove-the-process-currently-using-a-port-on-localhost-in-windows 
netstat -ano | findstr :<port number>
taskkill /PID <PID> /F
3)In case starting gives react-scripts not found please run
  npm i in the frontend folder
4)./script.sh or ./script.bat in case of any other issues contact @ fernandes.aaron1@gmail.com