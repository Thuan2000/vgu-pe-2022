import Navbar from "@components/ui/navbar";
import React from "react";
const PageLayout: React.FC = ({ children }) => {
	return (
		<div className="px-48">
			<Navbar />
			{children}
		</div>
	);
};
export default PageLayout;
