# Remove shop generated
sudo rm -rf frontend/shop/src/graphql/*.d.ts
sudo rm -rf frontend/shop/.next

# Remove admin generated
sudo rm -rf frontend/admin/src/graphql/*.d.ts
sudo rm -rf frontend/admin/.next

sudo rm -rf api/.pm2*.log
sudo rm -rf frontend/shop/.pm2*.log
sudo rm -rf frontend/admin/.pm2*.log