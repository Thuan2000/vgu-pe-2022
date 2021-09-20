import React from "react";
import { useTranslation } from "react-i18next";
import useIsMobile from "src/custom-hooks/use-is-mobile";
import SocialLoginButton from "./social-login-button";

const SocialSignup = () => {
	const { t } = useTranslation();
	const isMobile = useIsMobile();

	return (
		<div>
			<div className="flex-center flex-col sm:flex-row">
				<SocialLoginButton
					size="small"
					social="google"
					label={t(isMobile ? "" : "login-via-google-label")}
					className="w-72 mb-5 sm:mb-0 sm:mr-10"
				/>
				<SocialLoginButton
					size="small"
					social="facebook"
					label={t("login-via-facebook-label")}
					className="w-72"
				/>
			</div>
		</div>
	);
};
export default SocialSignup;
