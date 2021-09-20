import { checkIsMobile } from "@utils/functions";
import React, { useEffect, useState } from "react";
import useScreen from "./use-screen";
/**
 * check if in mobile or on laptop based on screen
 * @returns boolean: isMobile
 */

const useIsMobile = () => {
	const { width } = useScreen();
	const [isMobile, setIsMobile] = useState(checkIsMobile(width as number));

	useEffect(() => {
		setIsMobile(checkIsMobile(width as number));
	}, [width]);

	return isMobile;
};
export default useIsMobile;
