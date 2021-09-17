import React from "react";
import { useTranslation } from "react-i18next";
import SocialLoginButton from "./social-login-button";
import OrWithLines from "./ui/or-with-lines";

const SocialLogin = () => {
	const { t } = useTranslation();

	return (
		<div>
			<OrWithLines />
			<div className="flex items-center justify-center">
				<SocialLoginButton
					size="small"
					social="google"
					// label={t("login-via-google-label")}
					// className="w-full mb-3 border-gray-600 hover:bg-gray-600 hover:border-gray-600"
					className="mr-5 border-gray-600 hover:bg-gray-600 hover:border-gray-600"
				/>
				<SocialLoginButton
					size="small"
					social="facebook"
					// label={t("login-via-facebook-label")}
					// className="w-full border-gray-600 hover:bg-gray-600 hover:border-gray-600"
					className="border-gray-600 hover:bg-gray-600 hover:border-gray-600"
				/>
			</div>
		</div>
	);
};
export default SocialLogin;
