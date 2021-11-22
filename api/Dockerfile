# Set the base image to Ubuntu
FROM node
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run codegen
RUN npm run build:no-lint

# Expose port
EXPOSE  8080

# Run app using nodemon
CMD ["node", "dist/server.js"]