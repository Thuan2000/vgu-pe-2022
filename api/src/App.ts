// Apollo
import { ApolloServer } from "apollo-server";

// Graphql utils
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import Database from "./utils/database";

class App {
	private database = new Database();
	private apolloServer;

	constructor() {
		this.initRedis();
		this.initDB();
		this.initializeApollo();
		this.initializeMiddlewares();
	}

	private initDB() {
		this.database.connect();
	}

	private initRedis() {
		require("./utils/redis");
	}

	private initializeApollo(): void {
		// Defining all types
		const typeDefs = this.loadSchemaTypes();
		// Defining all Resolvers
		const resolvers = this.loadResolvers();
		this.apolloServer = new ApolloServer({ typeDefs, resolvers });
	}

	public listen(): void {
		this.apolloServer.listen(process.env.PORT);
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
			...resolvers
		};
	}

	private initializeMiddlewares(): void {}
}

export default App;
