import Loader from "@components/ui/storybook/loader/loader";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { removeAuthCredentials } from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";
const Logout = () => {
	const { replace } = useRouter();
	const { t } = useTranslation("common");

	useEffect(() => {
		removeAuthCredentials();
		replace(ROUTES.LOGIN);
	}, [replace]);

	return <Loader text={`${t("logging-out")}`} />;
};
export default Logout;
