# Migrate backend first
# sudo yarn --cwd ../../api db:migrate
# sudo yarn --cwd ../../api db:seed

# Change Dir to frontend shop
# cd ../frontend/shop

# Remove graphql codegen
sudo rm -rf frontend/shop/src/graphql/*.d.ts

# Install dependencies
sudo yarn
yarn build