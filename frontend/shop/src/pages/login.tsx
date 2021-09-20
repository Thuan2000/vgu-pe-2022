import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/client";

import LoginForm from "../components/login-form";
import { generateHeadTitle } from "../utils/seo-utils";
import { getAuthCredentials, isAuthenticated } from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";
import ImageIllustration from "@assets/login-page-illustration.jpg";
import Logo from "@components/ui/logo";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { locale } = ctx;
	const { token, role } = getAuthCredentials(ctx);

	if (token && role && isAuthenticated({ token, role })) {
		return {
			redirect: {
				destination: ROUTES.HOMEPAGE,
				permanent: false
			}
		};
	}
	return {
		props: {
			...(await serverSideTranslations(locale!, ["form", "common"]))
		}
	};
};

const Login = () => {
	const [data] = useSession();

	useEffect(() => {
		if (data) console.log(data);
	});

	const { t } = useTranslation("common");

	return (
		<>
			<Head>
				<title>{generateHeadTitle(t("common:login"))}</title>
				<meta name="description" content="SDConnect login page" />
			</Head>
			<div className="flex">
				<div className="w-4/6 bg-black relative h-screen">
					<Image
						src={ImageIllustration}
						objectFit="cover"
						layout="fill"
					/>
				</div>
				<div className="center-child w-3/6">
					<div className="w-3/5 flex flex-col items-center">
						<Logo className="mb-5" />
						<div className="w-full">
							<h1 className="font-semibold text-xl text-dark-blue">
								{t("login-title")}
							</h1>
							<LoginForm />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
