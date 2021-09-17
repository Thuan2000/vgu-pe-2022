import React from "react";
const ArrowDownIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
	return (
		<svg
			width="14"
			height="15"
			viewBox="0 0 14 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M3.08736 5.92085C3.31516 5.69305 3.68451 5.69305 3.91232 5.92085L6.99984 9.00837L10.0874 5.92085C10.3152 5.69305 10.6845 5.69305 10.9123 5.92085C11.1401 6.14866 11.1401 6.51801 10.9123 6.74581L7.41232 10.2458C7.18451 10.4736 6.81516 10.4736 6.58736 10.2458L3.08736 6.74581C2.85955 6.51801 2.85955 6.14866 3.08736 5.92085Z"
				fill="#B0BDC6"
			/>
		</svg>
	);
};
export default ArrowDownIcon;
