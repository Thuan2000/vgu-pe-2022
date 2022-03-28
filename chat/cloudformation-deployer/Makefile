#!make
include make.env
export $(shell sed 's/=.*//' make.env)

# -------------- PROD -------------------- #

# Create dev cloudformation stack for chat
create-prod-stack:
	aws s3 cp ./services/prod/ecs.yml s3://sdconnect-assets/cloudformation/prod/chat/ecs.yml
	aws s3 cp ./services/prod/elb.yml s3://sdconnect-assets/cloudformation/prod/chat/elb.yml
	aws s3 cp ./services/prod/rds.yml s3://sdconnect-assets/cloudformation/prod/chat/rds.yml
	aws s3 cp ./services/prod/s3.yml s3://sdconnect-assets/cloudformation/prod/chat/s3.yml
	aws cloudformation create-stack \
	--stack-name prod-sdconnect-chat-stack \
	--template-body file://./deploy-prod-stack.yml \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-prod.json

update-stack-prod:
	aws s3 cp ./services/prod/ecs.yml s3://sdconnect-assets/cloudformation/prod/chat/ecs.yml
	aws s3 cp ./services/prod/elb.yml s3://sdconnect-assets/cloudformation/prod/chat/elb.yml
	aws s3 cp ./services/prod/rds.yml s3://sdconnect-assets/cloudformation/prod/chat/rds.yml
	aws s3 cp ./services/prod/s3.yml s3://sdconnect-assets/cloudformation/prod/chat/s3.yml
	aws cloudformation update-stack \
	--stack-name prod-sdconnect-chat-stack \
	--template-body file://./deploy-prod-stack.yml \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-prod.json



# -------------- DEV -------------------- #

# Create dev cloudformation stack for chat
create-dev-stack:
	aws s3 cp ./services/dev/ecs.yml s3://sdconnect-assets/cloudformation/dev/chat/ecs.yml
	aws s3 cp ./services/dev/elb.yml s3://sdconnect-assets/cloudformation/dev/chat/elb.yml
	aws s3 cp ./services/dev/rds.yml s3://sdconnect-assets/cloudformation/dev/chat/rds.yml
	aws s3 cp ./services/dev/s3.yml s3://sdconnect-assets/cloudformation/dev/chat/s3.yml
	aws cloudformation create-stack \
	--stack-name dev-sdconnect-chat-stack \
	--template-body file://./deploy-dev-stack.yml \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json

update-stack-dev:
	aws s3 cp ./services/dev/ecs.yml s3://sdconnect-assets/cloudformation/dev/chat/ecs.yml
	aws s3 cp ./services/dev/elb.yml s3://sdconnect-assets/cloudformation/dev/chat/elb.yml
	aws s3 cp ./services/dev/rds.yml s3://sdconnect-assets/cloudformation/dev/chat/rds.yml
	aws s3 cp ./services/dev/s3.yml s3://sdconnect-assets/cloudformation/dev/chat/s3.yml
	aws cloudformation update-stack \
	--stack-name dev-sdconnect-chat-stack \
	--template-body file://./deploy-dev-stack.yml \
	--capabilities CAPABILITY_NAMED_IAM \
  --parameters file://./env-dev.json