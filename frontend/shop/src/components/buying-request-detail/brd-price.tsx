import Typography from "@components/ui/storybook/typography";
import { formatMoneyAmount, getSuffix, viDateFormat } from "@utils/functions";
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

  return (
    <div className="border-t border-b py-2 mt-3 fic justify-between w-full px-5">
      <div>
        <Typography variant="description" text={t("brd-budget-title")} />
        <div className="flex space-x-[2px]">
          <Typography
            variant="smallTitle"
            text={`${formatMoneyAmount(minBudget)}${t(getSuffix(minBudget))}`}
          />

          <Typography variant="smallTitle" text="-" />

          <Typography
            variant="smallTitle"
            text={`${formatMoneyAmount(maxBudget)}${t(getSuffix(maxBudget))}`}
          />
        </div>
      </div>

      <div>
        <Typography variant="description" text={t("brd-minOrder-title")} />
        <div className="flex">
          <Typography variant="smallTitle" text={minOrder + ""} />
          <Typography variant="smallTitle" text={unit} />
        </div>
      </div>

      <div>
        <Typography variant="description" text={t("brd-endDate-title")} />
        <Typography variant="smallTitle" text={viDateFormat(endDate)} />
      </div>
    </div>
  );
};
export default BRDPrice;
