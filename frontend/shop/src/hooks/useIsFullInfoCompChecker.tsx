import { useIsCompanyFullInfoMutation } from "@graphql/company.graphql";
import { isLogin, setIsFullInfoTrue } from "@utils/auth-utils";
import { getCompanyId, getIsCompanyFullInfo } from "@utils/functions";
import React, { useEffect, useState } from "react";

const useIsFullInfoCompChecker = () => {
  const [isFullInfo, setIsFullInfo] = useState(getIsCompanyFullInfo());
  const [checkFull] = useIsCompanyFullInfoMutation();

  useEffect(() => {
    async function checkFullInfo() {
      if (!isLogin() || isFullInfo) return;
      const { data } = await checkFull({ variables: { id: getCompanyId() } });

      if (data?.isCompanyFullInfo) {
        setIsFullInfo(true);
        setIsFullInfoTrue();
      }
    }

    checkFullInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFullInfo;
};
export default useIsFullInfoCompChecker;
