import Navbar from "@components/ui/navbar/navbar";
import React from "react";
const PageLayout: React.FC = ({ children }) => {
	return (
		<div className="px-10 md:px-48">
			<Navbar />
			{children}
		</div>
	);
};
export default PageLayout;
