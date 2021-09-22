import MenuIcon from "@assets/icons/menu-icon";
import React, { useState } from "react";

const Category = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setShowMenu(true)}
			onMouseLeave={() => setShowMenu(false)}
		>
			<button className="border flex-center rounded-md w-11 h-11">
				<MenuIcon className="hover:text-light" />
			</button>
		</div>
	);
};

export default Category;
