/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import App from "./App";
import { ADMIN_EMAIL_ADDRESS, validateEnv } from "./utils";

validateEnv();

const server = new App();

console.log(
	`🚀 Server listening on : http://localhost:${process.env.PORT}/graphql`
);

server.start();
