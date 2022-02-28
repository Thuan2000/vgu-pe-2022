# Note
1. ${env} = environmet (prod | dev)

# Step
1. Copy .env.example into .env and fill information
2. Deploy docker container to ecr: `make ${env}-build-and-deploy-api-image`

3. To create stack run `make create-${env}`
4. To update stack run `make create-${env}`
