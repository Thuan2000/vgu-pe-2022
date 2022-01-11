import Typography from "@components/ui/storybook/typography";
import {
  formatMoneyAmount,
  getMoneySuffix,
  getSuffix,
  thousandSeparator,
  viDateFormat,
} from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";

interface ISDPriceProps {
  minPrice: number;
  maxPrice: number;
  price: number;
}

const RecordPrice: React.FC<ISDPriceProps> = ({
  minPrice,
  maxPrice,
  price,
}) => {
  const { t } = useTranslation("common");

  function getPrice() {
    if (!maxPrice && !minPrice)
      return `${thousandSeparator(price)} ${t("budget-sign")}`;

    return `${thousandSeparator(minPrice!)} ${t("budget-sign")} 
    - ${thousandSeparator(maxPrice!)} ${t("budget-sign")}`;
  }

  return (
    <div className="border-t border-b py-2 mt-3 fic justify-between w-full">
      <div>
        <div className="flex space-x-[2px]">
          <Typography variant="smallTitle" size="md" text={getPrice()} />
        </div>
      </div>
    </div>
  );
};
export default RecordPrice;
