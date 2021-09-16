import { GetServerSideProps } from "next";
import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginForm from "../components/login-form";
import Head from "next/head";
import { generateHeadTitle } from "../utils/seo-utils";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, ["form", "common"]))
		}
	};
};

const Login = () => {
	const { t } = useTranslation("common");

	return (
		<>
			<Head>
				<title>{generateHeadTitle(t("common:login"))}</title>
				<meta name="description" content="SDConnect login page"></meta>
			</Head>
			<div className="flex w-full h-screen bg-blue-500">
				<div className="bg-dark text-white w-1/2"></div>
				<div className="bg-light center-child py-5 w-1/2">
					<div className="w-1/2">
						<h1 className="font-semibold text-xl">
							{t("login-title")}
						</h1>
						<LoginForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
