import React, { useEffect, useState } from "react";
const useScreen = () => {
	const [width, setWidth] = useState<number>();
	const [height, setHeight] = useState<number>();

	useEffect(() => {
		function handleResize() {
			setHeight(window.innerHeight);
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);

		return window.removeEventListener("resize", handleResize);
	}, [typeof window]);

	return { width, height };
};

export default useScreen;
