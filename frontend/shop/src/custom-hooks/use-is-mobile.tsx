import { checkIsMobile } from "@utils/functions";
import React, { useEffect, useState } from "react";
import useScreen from "./use-screen";
/**
 * check if in mobile or on laptop based on screen
 * @returns boolean: isMobile
 */

const useIsMobile = () => {
	const { width } = useScreen();
	console.log(width);
	const [isMobile, setIsMobile] = useState(checkIsMobile(width));

	useEffect(() => {
		setIsMobile(checkIsMobile(width));
	}, [width]);

	return isMobile;
};
export default useIsMobile;
