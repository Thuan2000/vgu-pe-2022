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

class App {
	private apolloServer;
	private app;

	constructor() {
		this.initDB();
		// this.initializeMiddlewares();
	}

	private initDB() {
		Database.connect();
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
				expressApp.listen({ port: process.env.PORT }, r)
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
