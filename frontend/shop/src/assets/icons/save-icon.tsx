import React from "react";
const SaveIcon: React.FC<React.SVGAttributes<{}>> = ({ fill, ...props }) => {
	return (
		<svg
			width="16"
			height="20"
			viewBox="0 0 16 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M0 2C0 0.895432 0.89543 0 2 0H14C15.1046 0 16 0.89543 16 2V19C16 19.3746 15.7907 19.7178 15.4576 19.8892C15.1245 20.0606 14.7236 20.0315 14.4188 19.8137L8 15.2289L1.58124 19.8137C1.27642 20.0315 0.875489 20.0606 0.542418 19.8892C0.209347 19.7178 0 19.3746 0 19V2ZM14 2L2 2V17.0568L7.41876 13.1863C7.76646 12.9379 8.23354 12.9379 8.58124 13.1863L14 17.0568V2Z"
				fill={fill || "#B0BDC6"}
			/>
		</svg>
	);
};
export default SaveIcon;
