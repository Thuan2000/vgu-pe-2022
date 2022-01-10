import { NumInput } from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import React from "react";
import { useTranslation } from "react-i18next";
import VariationPriceInputItemWrapper from "./variation-price-input-item-wrapper";

interface IVariationPriceInputItemProps {
  isLast: boolean;
  title: string;
  value: number | "";
  onChange: (e: number) => void;
}

const VariationPriceInputItem: React.FC<IVariationPriceInputItemProps> = ({
  isLast,
  title,
  value,
  onChange,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className={`fic`}>
      <VariationPriceInputItemWrapper isFooter={isLast} isLeftSide>
        <Typography text={title} />
      </VariationPriceInputItemWrapper>
      <VariationPriceInputItemWrapper isFooter={isLast} isRightSide>
        <NumInput
          value={value}
          onChange={onChange as any}
          placeholder={t("variationItemPrice-input-placeholder")}
          inputClassName={"!h-full border-0"}
          suffix={` ${t("budget-sign")}`}
        />
      </VariationPriceInputItemWrapper>
    </div>
  );
};
export default VariationPriceInputItem;
