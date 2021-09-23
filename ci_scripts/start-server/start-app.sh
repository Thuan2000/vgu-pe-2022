# Change dir
cd /home/ubuntu/sdconnect/ci_scripts/start-server

# Stop old app
sudo fuser -k 8080/tcp
sudo fuser -k 3000/tcp

# Start app
./start-api.sh
./start-shop.sh