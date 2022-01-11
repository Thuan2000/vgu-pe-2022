import Form from "@components/form";
import Button from "@components/ui/storybook/button";
import { NumInput } from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import React, { KeyboardEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PPSProductInlineLabel from "../pps-product-inline-label";

interface IPPSPVPAllVariationPriceInputProps {
  onSetAllprice: (e: number) => void;
}

const PPSPVPAllVariationPriceInput: React.FC<
  IPPSPVPAllVariationPriceInputProps
> = ({ onSetAllprice }) => {
  const { t } = useTranslation("form");
  const [allPrice, setAllPrice] = useState<number>();

  function handleAllPriceInputChange(e: number) {
    setAllPrice(e);
  }

  function handleConfirm() {
    onSetAllprice(allPrice!);
  }

  return (
    <div className="fic relative space-x-5">
      <PPSProductInlineLabel label={t("setAllVariationPrice-input-label")} />
      <NumInput
        onChange={handleAllPriceInputChange as any}
        value={allPrice}
        suffix={` ${t("budget-sign")}`}
        className={`w-full flex-shrink-0`}
        placeholder={t("setAllVariationPrice-input-placeholder")}
      />
      <Button
        disabled={!allPrice}
        className={`absolute left-full`}
        color="secondary-1"
        onClick={handleConfirm}
      >
        {t("setAllVariationPrice-button-label")}
      </Button>
    </div>
  );
};
export default PPSPVPAllVariationPriceInput;
