import { NumInput } from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import ValidationError from "@components/ui/storybook/validation-error";
import React from "react";
import { useTranslation } from "react-i18next";
import { MINIMUM_PRICE_RULE } from "../pps-product-schema";
import VariationPriceInputItemWrapper from "./variation-price-input-item-wrapper";

interface IVariationPriceInputItemProps {
  isLast: boolean;
  title: string;
  value: number | "";
  onChange: (e: number) => void;
  onFocus: () => void;
  isFocus: boolean;
}

const VariationPriceInputItem: React.FC<IVariationPriceInputItemProps> = ({
  isLast,
  title,
  value,
  onChange,
  onFocus,
  isFocus,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className={`fic relative`}>
      <VariationPriceInputItemWrapper isFooter={isLast} isLeftSide>
        <Typography text={title} />
      </VariationPriceInputItemWrapper>
      <VariationPriceInputItemWrapper isFooter={isLast} isRightSide>
        <NumInput
          value={value}
          min={0}
          allowNegative={false}
          onChange={onChange as any}
          onFocus={onFocus}
          autoFocus={isFocus}
          placeholder={t("variationItemPrice-input-placeholder")}
          inputClassName={"!h-full border-0"}
          suffix={` ${t("budget-sign")}`}
        />
      </VariationPriceInputItemWrapper>
      <div className={`absolute left-full ml-4 flex-shrink-0 w-56`}>
        <ValidationError
          message={
            value <= MINIMUM_PRICE_RULE
              ? `${t("variation-price-required-error")} : ${MINIMUM_PRICE_RULE}`
              : ""
          }
        />
      </div>
    </div>
  );
};
export default VariationPriceInputItem;
