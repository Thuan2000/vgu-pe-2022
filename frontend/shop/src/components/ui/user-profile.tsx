import React from "react";
import { useTranslation } from "react-i18next";

import ProfileAvatar from "./profile-avatar";

const UserProfile = () => {
	const { t } = useTranslation("common");

	return (
		<div className="flex-center">
			<div className="flex flex-col text-right">
				<p className="paragraph flex items-center">
					Hello,
					<h3 className="ml-2">Fatwa</h3>
				</p>
				<p className="text-red font-light">{t("not-verified")}</p>
			</div>
			<ProfileAvatar />
		</div>
	);
};
export default UserProfile;
