import App from "./App";
import { validateEnv } from "./utils";

validateEnv();

const server = new App();

console.log(`server run on : http://localhost:${process.env.PORT}`);

server.listen();
