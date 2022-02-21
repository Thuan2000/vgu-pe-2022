import { useIsCompanyFullInfoMutation } from "@graphql/company.graphql";
import { setIsCompanyFullInfoCookie } from "@utils/auth-utils";
import { getCompanyId, getIsCompanyFullInfo } from "@utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HaveToFullInfoIllustration from "./have-to-full-info-illustration";

interface IHaveToFullInfoWrapperProps {}

const HaveToFullInfoWrapper: React.FC<IHaveToFullInfoWrapperProps> = ({
  children,
}) => {
  const [isFullInfo, setIsFullInfo] = useState(getIsCompanyFullInfo());
  const [checkIsFullInfo] = useIsCompanyFullInfoMutation();
  const { pathname } = useRouter();

  useEffect(() => {
    async function checkFullInfo() {
      if (isFullInfo) return;
      const { data } = await checkIsFullInfo({
        variables: { id: getCompanyId() },
      });
      setIsFullInfo(data?.isCompanyFullInfo);
      setIsCompanyFullInfoCookie(data?.isCompanyFullInfo!);
    }

    checkFullInfo();
  }, [pathname]);

  useEffect(() => {
    if (!isFullInfo) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isFullInfo]);

  if (isFullInfo) return <>{children}</>;

  return (
    <div className={`relative`}>
      {!isFullInfo && (
        <>
          <HaveToFullInfoIllustration />
          <div className={`${!isFullInfo && "select-none blur-sm"}`}>
            {children}
          </div>
        </>
      )}
    </div>
  );
};
export default HaveToFullInfoWrapper;
