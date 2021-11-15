import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Button from "../storybook/button";

export type CreateTarget = "product" | "service";

interface IPPSTargetSelectorProps {}

const PPSTargetSelector: React.FC<IPPSTargetSelectorProps> = () => {
  const { t } = useTranslation("form");

  const { query, ...router } = useRouter();

  function changeCreateTarget(target: CreateTarget) {
    const { pathname } = router;
    router.replace({
      pathname,
      query: { ...query, target },
    });
  }

  return (
    <div className="flex justify-between">
      <Button
        variant="custom"
        className="border border-gray-200 w-[49%] !py-6"
        onClick={() => changeCreateTarget("product")}
      >
        {t("postProduct-product-button-label")}
      </Button>
      <Button
        variant="custom"
        className="border border-gray-200 w-[49%] !py-6"
        onClick={() => changeCreateTarget("service")}
      >
        {t("postProduct-product-button-label")}
      </Button>
    </div>
  );
};
export default PPSTargetSelector;
