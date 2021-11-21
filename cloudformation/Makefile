#!make
include .env
export $(shell sed 's/=.*//' .env)

# --------- DEV COMMANDS ---------

# Run this command if you've deleted the stack (for whatever reason) and want to create anew.
create-dev-stack:
	aws s3 cp ./services/ecs.yml s3://sdconnect/cloudformation/ecs.yml
	aws cloudformation create-stack \
	--stack-name sdconnect-dev \
	--template-body file://./services/ecs.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

# Run this command to update resources on AWS (if any).
update-stack-dev:
	aws s3 cp ./services/ecs.yml s3://sdconnect/cloudformation/ecs.yml
	aws cloudformation update-stack \
	--stack-name sdconnect-dev \
	--template-body file://./deploy-dev.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

# Build and push the backend image (update application)
dev-build-and-deploy-api-image:
	docker build -t $(DOCKER_IMAGE_NAME) ../api
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(AWS_ID).dkr.ecr.ap-southeast-1.amazonaws.com
	docker tag $(DOCKER_IMAGE_NAME) $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest
	docker push $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest
