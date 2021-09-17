import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import VietnamFlagIcon from "@assets/icons/flags/vietnam-icon";
import React from "react";
import { useTranslation } from "react-i18next";
const LanguageSelector = () => {
	const { t } = useTranslation("common");

	return (
		<div className="flex items-center w-36">
			<span className="text-sm text-body mr-3">{t("language")}</span>
			<div className="flex cursor-pointer items-center">
				<VietnamFlagIcon className="w-7 h-7" />
				<ArrowDownIcon className="ml-2" />
			</div>
		</div>
	);
};
export default LanguageSelector;
