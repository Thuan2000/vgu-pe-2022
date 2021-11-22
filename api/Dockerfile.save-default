# Stage 1 - the build process
FROM node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
# RUN npm build

# COPY --from=builder /usr/src/app/dist ./dist
ENV DEV_DB_DIALECT=mysql
ENV NODE_ENV=development
ENV PORT=8080
ENV JWT_SECRET=supersecret

# Database

# DEV Database
ENV DEV_DB_DIALECT=mysql
ENV DEV_DB_HOST=localhost
ENV DEV_DB_DATABASE=sdconnect
ENV DEV_DB_PORT=3306
ENV DEV_DB_USERNAME=root
ENV DEV_DB_PASSWORD=password

# PROD Database
ENV PROD_DB_DIALECT=mysql
ENV PROD_DB_HOST=localhost
ENV PROD_DB_DATABASE=sdconnect
ENV PROD_DB_PORT=3306
ENV PROD_DB_USERNAME=root
ENV PROD_DB_PASSWORD=password

# AWS
ENV AWS_REGION=ap-southeast-1

# AWS DEV
ENV DEV_AWS_ACCESS_KEY=secret
ENV DEV_AWS_SECRET_KEY=secret

# AWS PROD
ENV PROD_AWS_ACCESS_KEY=secret
ENV PROD_AWS_SECRET_KEY=secret

# S3 DEV
ENV DEV_S3_BUCKET_NAME=sdconnect-dev

# S3 PROD
ENV PROD_S3_BUCKET_NAME=sdconnect-prod

# SMTP
ENV SMTP_HOST=smtp.gmail.com
ENV SMTP_PORT=465
ENV SMTP_SECURE=true
ENV SMTP_USERNAME=email@gmail.com
ENV SMTP_PASSWORD=password-123
ENV SMTP_FROM=<no-reply>@sdconnect.dev

# ES
ENV ES_ENDPOINT=http://localhost:9200
ENV ES_USERNAME=elastic
ENV ES_PASSWORD=0renNHLelfxZUWC8bryV


EXPOSE 8080
CMD ["npm", "start"]