# Installation

1. `cp env.example .env`
2. Fill in the .env data
3. `yarn` to install dependencies

# Running

1. Simply run `yarn dev` for development

# Deploying

1. `cd cloudformation-deployer`
2. `cp make.env.example make.env`
3. Fill in the _AWS_ID_ don't change anything except _AWS_ID_
4. cp env-${stage}.json.example to env-${stage}.json and fill the information please be carefull
5. run `yarn deploy-{env}`
