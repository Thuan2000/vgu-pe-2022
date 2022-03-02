#!make
include make.env
export $(shell sed 's/=.*//' make.env)

# Build and push the backend image (update application)
dev-build-and-deploy-api-image:
	docker build -t $(DOCKER_IMAGE_NAME) .
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(AWS_ID).dkr.ecr.${AWS_REGION}.amazonaws.com
	docker tag $(DOCKER_IMAGE_NAME) $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest
	docker push $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest