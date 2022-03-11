#!make
include .env
export $(shell sed 's/=.*//' .env)

# --------- PROD COMMANDS ---------

# --------- API STACK COMMANDS ---------
create-prod-stack:
	aws s3 cp ./services/prod/api/rds.yml s3://sdconnect-assets/cloudformation/prod/rds.yml
	aws s3 cp ./services/prod/api/ecs.yml s3://sdconnect-assets/cloudformation/prod/ecs.yml
	aws s3 cp ./services/prod/api/elb.yml s3://sdconnect-assets/cloudformation/prod/elb.yml
	aws s3 cp ./services/prod/api/redis.yml s3://sdconnect-assets/cloudformation/prod/redis.yml
	aws s3 cp ./services/prod/api/open-search.yml s3://sdconnect-assets/cloudformation/prod/open-search.yml
	aws s3 cp ./services/prod/redis.yml s3://sdconnect-assets/cloudformation/prod/redis.yml
	aws s3 cp ./services/prod/api/s3.yml s3://sdconnect-assets/cloudformation/prod/s3.yml
	aws cloudformation create-stack \
	--stack-name prod-sdconnect-api-stack \
	--template-body file://./deploy-prod-stacks.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-prod.json

update-stack-prod:
	aws s3 cp ./services/prod/api/rds.yml s3://sdconnect-assets/cloudformation/prod/rds.yml
	aws s3 cp ./services/prod/api/ecs.yml s3://sdconnect-assets/cloudformation/prod/ecs.yml
	aws s3 cp ./services/prod/api/elb.yml s3://sdconnect-assets/cloudformation/prod/elb.yml
	aws s3 cp ./services/prod/api/open-search.yml s3://sdconnect-assets/cloudformation/prod/open-search.yml
	aws s3 cp ./services/prod/api/redis.yml s3://sdconnect-assets/cloudformation/prod/redis.yml
	aws s3 cp ./services/prod/api/s3.yml s3://sdconnect-assets/cloudformation/prod/s3.yml
	aws cloudformation update-stack \
	--stack-name prod-sdconnect-api-stack \
	--template-body file://./deploy-prod-stacks.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-prod.json

prod-build-and-deploy-api-image:
	docker build -t $(PROD_DOCKER_IMAGE_NAME) ../api
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(AWS_ID).dkr.ecr.${AWS_REGION}.amazonaws.com
	docker tag $(PROD_DOCKER_IMAGE_NAME) $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(PROD_AWS_ECR_REPOSITORY):latest
	docker push $(AWS_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(PROD_AWS_ECR_REPOSITORY):latest

# --------- DEV COMMANDS ---------

# --------- API STACK COMMANDS ---------
# Run this command if you've deleted the stack (for whatever reason) and want to create anew.
create-dev-stack:
	aws s3 cp ./services/dev/rds-api.yml s3://sdconnect-assets/cloudformation/dev/rds-api.yml
	aws s3 cp ./services/dev/ecs-api.yml s3://sdconnect-assets/cloudformation/dev/ecs-api.yml
	aws s3 cp ./services/dev/elb-api.yml s3://sdconnect-assets/cloudformation/dev/elb-api.yml
	aws s3 cp ./services/dev/redis-api.yml s3://sdconnect-assets/cloudformation/dev/redis-api.yml
	aws s3 cp ./services/dev/open-search-api.yml s3://sdconnect-assets/cloudformation/dev/open-search-api.yml
	aws s3 cp ./services/dev/s3-api.yml s3://sdconnect-assets/cloudformation/dev/s3-api.yml
	aws cloudformation create-stack \
	--stack-name dev-sdconnect-stack \
	--template-body file://./deploy-dev-stacks.yml  \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

# Run this command if want to update stack.
update-stack-dev:
	aws s3 cp ./services/dev/rds-api.yml s3://sdconnect-assets/cloudformation/dev/rds-api.yml
	aws s3 cp ./services/dev/ecs-api.yml s3://sdconnect-assets/cloudformation/dev/ecs-api.yml
	aws s3 cp ./services/dev/elb-api.yml s3://sdconnect-assets/cloudformation/dev/elb-api.yml
	aws s3 cp ./services/dev/redis-api.yml s3://sdconnect-assets/cloudformation/dev/redis-api.yml
	aws s3 cp ./services/dev/s3-api.yml s3://sdconnect-assets/cloudformation/dev/s3-api.yml
	aws cloudformation update-stack \
	--stack-name dev-sdconnect-stack \
	--template-body file://./deploy-dev-stacks.yml  \
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