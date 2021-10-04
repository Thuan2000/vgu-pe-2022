import React from "react";
const MenuIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M8 7C8 6.44772 8.44772 6 9 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H9C8.44772 8 8 7.55228 8 7ZM8 12C8 11.4477 8.44772 11 9 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H9C8.44772 13 8 12.5523 8 12ZM8 17C8 16.4477 8.44772 16 9 16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H9C8.44772 18 8 17.5523 8 17Z"
				fill="#B0BDC6"
			/>
			<rect x="4" y="6" width="3" height="2" rx="1" fill="#B0BDC6" />
			<rect x="4" y="11" width="3" height="2" rx="1" fill="#B0BDC6" />
			<rect x="4" y="16" width="3" height="2" rx="1" fill="#B0BDC6" />
		</svg>
	);
};
export default MenuIcon;
