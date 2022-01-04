#!make
include .env
export $(shell sed 's/=.*//' .env)

# --------- DEV COMMANDS ---------

# Run this command if you've deleted the stack (for whatever reason) and want to create anew.
create-dev-stack:
	aws s3 cp ./databases/dev/rds.yml s3://sdconnect/cloudformation/dev/rds.yml
	aws s3 cp ./services/dev/ecs-api.yml s3://sdconnect/cloudformation/dev/ecs-api.yml
	aws s3 cp ./services/dev/elb-api.yml s3://sdconnect/cloudformation/dev/elb-api.yml
	aws cloudformation create-stack \
	--stack-name sdconnect-dev \
	--template-body file://./deploy-dev.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

# Run this command to update resources on AWS (if any).
# aws s3 cp ./databases/dev/rds.yml s3://sdconnect/cloudformation/dev/rds.yml
# aws s3 cp ./services/dev/elb-api.yml s3://sdconnect/cloudformation/dev/elb-api.yml
update-stack-dev:
	aws s3 cp ./services/dev/ecs-api.yml s3://sdconnect/cloudformation/dev/ecs-api.yml
	aws cloudformation update-stack \
	--stack-name sdconnect-dev \
	--template-body file://./deploy-dev.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

# Build and push the backend image (update application)
dev-build-and-deploy-api-image:
	docker build -t $(DOCKER_IMAGE_NAME) ../api
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(AWS_ID).dkr.ecr.${AWS_REGION}.amazonaws.com
	docker tag $(DOCKER_IMAGE_NAME) $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest
	docker push $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(AWS_ECR_REPOSITORY):latest

# ----- BELOW COMAMNDS ARE FOR THUAN TO CONVENIENTLY TEST OUT CLOUDFORMATION ----- 

# ------ TO BUILD NEW DOCKER IMAGE ------
# sudo docker build -t dev-sdconnect-api ../api
# aws ecr get-login-password --region ap-southeast-1 | sudo docker login --username AWS --password-stdin 981317724248.dkr.ecr.ap-southeast-1.amazonaws.com
# sudo docker tag dev-sdconnect-api 981317724248.dkr.ecr.ap-southeast-1.amazonaws.com/dev-sdconnect:latest
# sudo docker push 981317724248.dkr.ecr.ap-southeast-1.amazonaws.com/dev-sdconnect:latest

# aws cloudformation create-stack --stack-name sdconnect-dev-ecs-api --template-body file://./ecs-api.yml --capabilities CAPABILITY_NAMED_IAM --parameters file://./ecs-api.json