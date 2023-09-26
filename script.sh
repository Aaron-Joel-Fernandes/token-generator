#!/bin/bash

# Build and run the Spring Boot application
cd generator/generator
mvn spring-boot:run &

cd ../../validator/validator
mvn spring-boot:run &

# Build and run the React application
cd ../../frontend
npm start




