/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import Database from "@services/database.service";
import { getUserFromToken } from "@utils/functions";
import AWSService from "@services/aws.services";
import ChatService from "@services/chat.service";

class App {
	private apolloServer;
	private app;

	constructor() {
		this.initAWS();
		this.initDB();
		this.initChat();
		// this.initializeMiddlewares();
	}

	private initChat() {
		ChatService.connect();
	}

	private initDB() {
		Database.connect();
	}

	private initAWS() {
		AWSService.init();
	}

	public async start(): Promise<void> {
		try {
			// Apollo Server
			const typeDefs = this.loadSchemaTypes();
			const resolvers = this.loadResolvers();
			this.apolloServer = new ApolloServer({
				typeDefs,
				resolvers,
				introspection: true,
				context: ({ req }) => {
					const token = req.headers.authorization;

					const user = getUserFromToken(token);

					return { user };
				}
			});
			await this.apolloServer.start();

			// Express Server
			this.app = express();
			this.app.use(graphqlUploadExpress());
			const expressApp = this.app;

			this.apolloServer.applyMiddleware({ app: this.app });
			await new Promise(r =>
				expressApp.listen({ port: process.env.PORT || 8080 }, r)
			);
		} catch (err) {
			console.error(err);
		}
	}

	private loadSchemaTypes() {
		const typeFiles = loadFilesSync(
			`${__dirname}/graphql/schemas/**/*.graphql`
		);

		return mergeTypeDefs(typeFiles);
	}

	private loadResolvers() {
		const resolverArray = loadFilesSync(
			`${__dirname}/graphql/resolvers/**/*.resolver.*`
		);
		const resolvers = mergeResolvers(resolverArray);

		return {
			Upload: GraphQLUpload,
			...resolvers
		};
	}

	// private initializeMiddlewares(): void {}
}

export default App;
