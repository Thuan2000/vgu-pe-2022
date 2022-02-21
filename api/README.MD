# SDConnect API

### Requirement

-   yarn
-   nodejs (V >12.0)
-   mysql-server
-   redis-server

### Packages

-   typescript (typesafety)
-   sequelize (ORM)
-   graphql, apollo server (Frontend - Backend bridge)
-   Graphql codegen (Generate schema into types, such as interface)
-   swc (For faster dev compilation)
-   Elasticsearch

### Files Info

-   migrations is on /src/db/migrations/\*
-   seeders is on /src/db/seeders/\*
-   all graphql related is on /src/graphql/\*
-   /Repositories, is bunch of reusable functions for certain things
-   /Resolver, to call controller
-   /Controller, to handle function and do logic

### Before Installation

Please make sure to have all the packages installed, and have all the environment set up, like mysql, redis, elasticsearch, aws, etc.

### Installation

```
  git clone https://github.com/emolyze/sdconnect
  cd sdconnect/api
  cp env.example .env
  yarn
  yarn db:migrate
  yarn db:seed
  yarn dev
```

### NOTES

-   ES will be refactored completely to use aws opensearch
