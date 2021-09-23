import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { generateHeadTitle } from "@utils/seo-utils";
import RegisterIllustration from "@assets/login-page-illustration.jpg";
import SocialRegister from "@components/social-signup";
import SignupForm from "@components/signup-form";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import Link from "@components/ui/link";
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

const SignUp = () => {
	const { t } = useTranslation("common");

	return (
		<>
			<Head>
				<title>{generateHeadTitle(t("signup-title"))}</title>
				<meta
					name="description"
					content="Register to sdconnect.vn now to be part of our platform"
				/>
			</Head>

			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/2 md:relative invisible sm:visible">
					<Image
						src={RegisterIllustration}
						objectFit="cover"
						layout="fill"
					/>
				</div>
				<div className="bg-white rounded-lg px-5 pt-4 pb-3 absolute x-center w-5/6 position-normal top-2 sm:top-0 md:relative md:w-full md:px-28">
					<Logo className="sm:hidden" />
					<h1 className="font-semibold text-display-2 text-dark-blue mb-5">
						{t("signup-title")}
					</h1>
					{/* <SocialRegister /> */}
					<SignupForm />
					<p className="mt-4 block text-body-dark font-semibold text-sm leading-none mb-3">
						{t("form:already-have-account")}
						<Link
							href={ROUTES.LOGIN}
							className="text-blue ml-1"
							noDecoration
						>
							{t("form:login")}
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};
export default SignUp;
