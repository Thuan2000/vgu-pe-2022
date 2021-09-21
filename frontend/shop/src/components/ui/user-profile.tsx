import ProfileIcon from "@assets/icons/profile-icon";
import { ROUTES } from "@utils/routes";
import React from "react";
import Link from "./link";
const UserProfile = () => {
	return (
		<div className="flex-center">
			<div className="flex flex-col text-right">
				<p className="paragraph flex items-center">
					Hello,
					<h3 className="ml-2">Fatwa</h3>
				</p>
				<p className="text-red font-light">not verified</p>
			</div>
			<Link href={ROUTES.LOGOUT}>
				<button className="border h-11 w-11 center-child rounded-md ml-4">
					<ProfileIcon />
				</button>
			</Link>
		</div>
	);
};
export default UserProfile;
