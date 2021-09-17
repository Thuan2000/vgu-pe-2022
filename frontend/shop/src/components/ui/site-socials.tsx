import { siteSettings } from "@settings/site.settings";
import React from "react";
import Link from "./link";

export interface ISiteSocialsProps extends React.HTMLAttributes<Element> {
	withLabel?: boolean;
}

const SiteSocials = ({ className, ...props }: ISiteSocialsProps) => {
	const { socials } = siteSettings;
	return (
		<div className={`flex w-36 ${className}`} {...props}>
			{socials?.length > 0 &&
				socials.map((social) => {
					const { icon: Icon, href, label } = social;
					return (
						<Link
							href={href}
							title={`${label} | ${href}`}
							className="mr-3"
							target="_blank"
						>
							<Icon className="w-5 h-5" />
						</Link>
					);
				})}
		</div>
	);
};
export default SiteSocials;
