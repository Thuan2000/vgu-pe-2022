import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { ROUTES } from "@utils/routes";
import Link from "./ui/link";
import Button from "./ui/storybook/button";
import UnderConstructionIllustration from "@assets/under-construction-illustration.gif";

const UnderDevelopment = () => {
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col items-center my-5">
			<p className="mb-5 text-2xl">
				<strong className="text-dark-blue">Sorry :(</strong> this page
				is under development
			</p>

			<div className="w-2/3">
				<Image
					className="my-5"
					src={UnderConstructionIllustration}
					objectFit="cover"
				/>
			</div>

			<p className="my-5 text-xl">
				It will be available soon. Please come back again later
			</p>
			<Button size="small">
				<Link href={ROUTES.HOMEPAGE} noDecoration>
					{t("return-home")}
				</Link>
			</Button>
		</div>
	);
};
export default UnderDevelopment;
