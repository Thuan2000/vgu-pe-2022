import Typography from "@components/ui/storybook/typography";
import {
  formatMoneyAmount,
  getMoneySuffix,
  getSuffix,
  viDateFormat,
} from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";

interface IBRDPriceProps {
  minBudget: number;
  maxBudget: number;
  minOrder: number;
  unit: string;
  endDate: string;
}

const BRDPrice: React.FC<IBRDPriceProps> = ({
  minBudget,
  maxBudget,
  minOrder,
  unit,
  endDate,
}) => {
  const { t } = useTranslation("common");

  function getPrice() {
    return `${formatMoneyAmount(minBudget!)}${t(getMoneySuffix(maxBudget))} ${t(
      "budget-sign"
    )} - ${formatMoneyAmount(maxBudget!)}${t(getMoneySuffix(maxBudget))} ${t(
      "budget-sign"
    )}`;
  }
  return (
    <div className="border-t border-b py-2 mt-3 fic justify-between w-full px-5">
      <div>
        <Typography variant="description" text={t("brd-budget-title")} />
        <Typography variant="smallTitle" text={getPrice()} />
      </div>

      <div>
        <Typography variant="description" text={t("brd-minOrder-title")} />
        <Typography variant="smallTitle" text={`${minOrder} ${unit}`} />
      </div>

      <div>
        <Typography variant="description" text={t("brd-endDate-title")} />
        <Typography variant="smallTitle" text={viDateFormat(endDate)} />
      </div>
    </div>
  );
};
export default BRDPrice;
