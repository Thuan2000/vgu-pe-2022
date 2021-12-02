import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useWindowSize } from "react-use";

const useIsPhone = () => {
  const PHONE_MAX_WIDTH = 768;
  const { width } = useWindowSize();

  function checkIsMobile() {
    return isMobile || width < PHONE_MAX_WIDTH;
  }

  const [isPhone, setIsPhone] = useState(checkIsMobile());

  useEffect(() => {
    setIsPhone(checkIsMobile());
  }, [width, isMobile]);

  return isPhone;
};
export default useIsPhone;
