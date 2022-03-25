import { numberWithDotSeparator } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../storybook/typography";

export function ProPlans({}) {
  const { t } = useTranslation();

  const subPackages = [
    { id: 1, price: 1000000, monthQty: 1, monthExtra: 0 },
    { id: 2, price: 6000000, monthQty: 6, monthExtra: 1 },
    { id: 3, price: 12000000, monthQty: 12, monthExtra: 3 },
  ];

  function getBaseMonthBenefitText(monthQty: number) {
    return `${t("duration-text")} ${monthQty} ${t("month-text")}`;
  }

  function getExtraMonthBenefitText(monthQty: number) {
    if (!monthQty) return "";
    return `+ ${monthQty} ${t("month-text")} ${t("free-text")}`;
  }

  return (
    <div className={`space-y-3`}>
      {subPackages.map((sp) => {
        return (
          <div
            key={sp.id + "subpackages"}
            className={`border border-gray-10 px-7 py-6 sm:w-[400px] rounded-sm`}
          >
            <Typography
              text={`${numberWithDotSeparator(sp.price)}${t("budget-sign")}`}
              size="lg"
              color="secondary-1"
              weight="extrabold"
            />

            <div className="fic space-x-1">
              <Typography
                text={`${getBaseMonthBenefitText(sp.monthQty)}`}
                weight="semibold"
                color="gray-400"
              />
              <Typography
                text={`${getExtraMonthBenefitText(sp.monthExtra)}`}
                weight="semibold"
                color="primary"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
