import type { GetServerSideProps, NextPage } from "next";
import {
	getAuthCredentials,
	hasAccess,
	isAuthenticated
} from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { token, role } = getAuthCredentials(ctx);

	if (!token || !role || !isAuthenticated({ token, role })) {
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
	return <div>HOMEPAGE</div>;
};

export default Home;
