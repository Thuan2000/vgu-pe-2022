import React from "react";

import styles from "./or.module.css";

const OrWithLines = (props: React.HTMLAttributes<string>) => {
	return <div className={`${styles.or} text-gray-600`}>OR</div>;
};
export default OrWithLines;
