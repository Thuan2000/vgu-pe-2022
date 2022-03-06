# Step
1. Copy .env.example into .env and fill information
2. Deploy newest docker container to ecr: `make ${env}-build-and-deploy-api-image`

3. To create stack run `make create-${env}`
4. To update stack run `make create-${env}`

# Note
1. ${env} = environmet (prod | dev)
2. To update the server after you deploy the newest container. change the value of `refresher` attribute see `env-${env}.json` file and then run 
`make create-${env}`