#!/bin/bash

# Start the Spring Boot application in the background
java -jar /app/app.jar &

# Start the Next.js frontend
cd /app/frontend && npm start
