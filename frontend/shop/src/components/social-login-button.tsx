import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { signIn, useSession } from "next-auth/client";

import Button, { ButtonProps } from "./ui/storybook/button";
import FacebookIcon from "@assets/icons/socials/facebook-icon";
import GoogleIcon from "@assets/icons/socials/google-icon";

export interface ISocialButtonProps extends ButtonProps {
	social: "google" | "facebook";
	label?: string;
}

const SocialLoginButton = ({ label, social, ...props }: ISocialButtonProps) => {
	const { t } = useTranslation("common");
	// const [sessionData] = useSession();

	// useEffect(() => {
	// 	if (sessionData) {
	// 		console.log(sessionData);
	// 		console.log("Storing session to database");
	// 	}
	// }, [sessionData]);

	function handleClick() {
		// @TODO uncomment next line
		// signIn(social);
	}

	return (
		<Button variant="outline" {...props} onClick={handleClick}>
			{social === "facebook" && <FacebookIcon className="w-6 mr-2" />}
			{social === "google" && <GoogleIcon className="w-6 mr-2" />}
			{label}
		</Button>
	);
};
export default SocialLoginButton;
