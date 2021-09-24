# Migrate backend first
cd ../../api
sudo yarn db:migrate
sudo yarn db:seed

# Change Dir to frontend shop
cd ../frontend/shop

# Install dependencies
sudo yarn
yarn build