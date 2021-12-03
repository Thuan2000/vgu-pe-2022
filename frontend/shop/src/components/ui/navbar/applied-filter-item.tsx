import XIcon from "@assets/icons/x-icon";
import { COLORS } from "@utils/colors";
import { toCamelCase } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "../storybook/typography";

interface IAppliedFilterItemProps {
  queryKey: string;
  value: string;
}

const AppliedFilterItem: React.FC<IAppliedFilterItemProps> = ({
  queryKey,
  value,
}) => {
  const { t } = useTranslation();
  const [isHoveredX, setIsHoveredX] = useState(false);
  const { query, ...router } = useRouter();

  function removeQuery() {
    if (!query || !query[queryKey]) return;

    delete query[queryKey];
    const { pathname } = router;

    router.replace({
      pathname,
      query,
    });
  }

  return (
    <div className="border fic rounded-full border-primary overflow-hidden pr-2 mt-2 mr-2">
      <div
        className={`hover:bg-primary-hover h-full py-2 transition-colors duration-200 cursor-pointer`}
        onMouseEnter={() => setIsHoveredX(true)}
        onMouseLeave={() => setIsHoveredX(false)}
        onClick={removeQuery}
      >
        <XIcon
          className="mx-2 w-2 h-2"
          fill={isHoveredX ? COLORS.WHITE : COLORS.PRIMARY.DEFAULT}
        />
      </div>
      <div className="space-x-1 fic">
        <Typography text={toCamelCase(queryKey)} />
        <span>:</span>
        <Typography text={t(`${queryKey}:` + value)} />
      </div>
    </div>
  );
};
export default AppliedFilterItem;
