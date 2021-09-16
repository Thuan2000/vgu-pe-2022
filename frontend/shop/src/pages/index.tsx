import type { GetServerSideProps, NextPage } from "next";
import {
	getAuthCredentials,
	hasAccess,
	isAuthenticated
} from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { token, permissions } = getAuthCredentials(ctx);

	if (!isAuthenticated({ token, permissions })) {
		return {
			redirect: {
				destination: ROUTES.LOGIN,
				permanent: false
			}
		};
	}
	return {
		props: {}
	};
};

const Home: NextPage = () => {
	return <div className="text-red-700"></div>;
};

export default Home;
