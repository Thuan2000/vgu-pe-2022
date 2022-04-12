# Step

1. Copy make.env.example into make.env and fill only id information
2. Make sure to use latest api
3. Build the image run `make build-deploy-image-${env}`

4. To create stack run `make create-${env}`
5. To update stack run `make create-${env}`

# Note

1. On Building the image please set the .env file first or else it will have unstable env variables
2. ${env} = environmet (prod | dev)
3. To update the frontend after you deploy the newest container. change the value of `refresher` attribute see `env-${env}.json` file and then run
   `make update-stack-${env}`
