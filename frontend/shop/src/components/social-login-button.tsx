import React from "react";
import { useTranslation } from "react-i18next";
import { signIn } from "next-auth/client";

import Button, { ButtonProps } from "./ui/button";
import FacebookIcon from "@assets/icons/socials/facebook-icon";
import GoogleIcon from "@assets/icons/socials/google-icon";

export interface ISocialButtonProps extends ButtonProps {
	social: "google" | "facebook";
	label?: string;
}

const SocialLoginButton = ({ label, social, ...props }: ISocialButtonProps) => {
	const { t } = useTranslation("common");

	function handleClick() {
		signIn(social);
	}

	return (
		<Button variant="outline" {...props} onClick={handleClick}>
			{social === "facebook" && <FacebookIcon className="w-7 h-7 " />}
			{social === "google" && <GoogleIcon className="w-5 h-5" />}
			{label && label}
		</Button>
	);
};
export default SocialLoginButton;
