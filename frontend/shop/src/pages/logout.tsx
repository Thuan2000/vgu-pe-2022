import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { removeAuthCredentials } from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";
const Logout = () => {
	const { replace } = useRouter();

	useEffect(() => {
		removeAuthCredentials();
		replace(ROUTES.LOGIN);
	}, [replace]);

	return <div>Logging Out</div>;
};
export default Logout;
