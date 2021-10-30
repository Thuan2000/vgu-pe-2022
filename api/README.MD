# SDConnect API

### Requirement

-   yarn
-   nodejs (V >12.0)

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

-   Please run elasticsearch on docker https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html
-   And set the auth https://www.elastic.co/guide/en/elasticsearch/reference/7.15/security-minimal-setup.html
-   Please make sure to sinchronyze tsconfic.json and .swcrc
