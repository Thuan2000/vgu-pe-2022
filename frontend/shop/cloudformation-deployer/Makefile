#!make
include make.env
export $(shell sed 's/=.*//' make.env)

# Create dev cloudformation stack for shop
create-dev-stack:
	aws s3 cp ./services/dev/ecs.yml s3://sdconnect-assets/cloudformation/dev/shop/ecs.yml
	aws s3 cp ./services/dev/elb.yml s3://sdconnect-assets/cloudformation/dev/shop/elb.yml
	aws cloudformation create-stack \
	--stack-name dev-sdconnect-shop-stack \
	--template-body file://./deploy-dev-stack.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

update-stack-dev:
	aws s3 cp ./services/dev/ecs.yml s3://sdconnect-assets/cloudformation/dev/shop/ecs.yml
	aws s3 cp ./services/dev/elb.yml s3://sdconnect-assets/cloudformation/dev/shop/elb.yml
	aws cloudformation update-stack \
	--stack-name dev-sdconnect-shop-stack \
	--template-body file://./deploy-dev-stack.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

# Build and push the backend image (update application)
build-deploy-image:
	docker build -t $(DOCKER_IMAGE_NAME) ..
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(AWS_ID).dkr.ecr.${AWS_REGION}.amazonaws.com
	docker tag $(DOCKER_IMAGE_NAME) $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest
	docker push $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest