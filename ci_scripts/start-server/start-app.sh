# Change dir
cd /home/ubuntu/sdconnect

# Stop old app
sudo fuser -k 8080/tcp
sudo fuser -k 3000/tcp

# Start app
pm2 start ecosystem.config.js