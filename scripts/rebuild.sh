#!/bin/bash

# This script stops the running Docker containers, rebuilds the images,
# and starts the services again in detached mode.

echo "Stopping and removing existing containers..."
docker compose down

echo "Rebuilding images and starting new containers..."
docker compose up -d --build

echo "Deployment complete. Application is running with the latest updates."
