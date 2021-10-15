import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

const useIsPhone = () => {
  const { width } = useWindowSize();

  const [isPhone, setIsPhone] = useState(width < 500);

  useEffect(() => {
    setIsPhone(width < 500);
  }, [width]);

  return isPhone;
};
export default useIsPhone;
