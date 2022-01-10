import Typography from "@components/ui/storybook/typography";
import { findIndex } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { IProductVariation, IVariationOpt } from "./pppspvp-manager";
import VariationPriceInputItem from "./variation-item";
import VariationPriceInputItemWrapper from "./variation-price-input-item-wrapper";
import PPSProductInlineLabel from "../pps-product-inline-label";

interface IPPSPVPAllVariationManagerProps {
  allPrice?: number;
  variationDetails: IProductVariation[];
  onChange: (e: IProductVariation[]) => void;
}

const PPSPVPAllVariationManager: React.FC<IPPSPVPAllVariationManagerProps> = ({
  allPrice,
  variationDetails,
  onChange,
}) => {
  const { t } = useTranslation("form");

  function handleVariationPriceChange(id: string, value: number) {
    const idx = findIndex(variationDetails, (v) => v.id === id);
    if (idx === -1) return;

    variationDetails[idx].price = value;
    onChange([...variationDetails]);
  }

  return (
    <div className="flex items-start space-x-5">
      <PPSProductInlineLabel label={t("single-price-input-label")} />

      <div className={`w-full`}>
        <div className={`fic`}>
          <VariationPriceInputItemWrapper isLeftSide isHeader>
            <Typography weight="semibold" text={t("variation-text-title")} />
          </VariationPriceInputItemWrapper>
          <VariationPriceInputItemWrapper isRightSide isHeader>
            <Typography weight="semibold" text={t("price-text-title")} />
          </VariationPriceInputItemWrapper>
        </div>
        {variationDetails?.map(({ id, title, price }, idx) => {
          return (
            <VariationPriceInputItem
              isLast={idx === variationDetails.length - 1}
              title={title}
              onChange={(e) => handleVariationPriceChange(id, e)}
              value={price || allPrice || ""}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PPSPVPAllVariationManager;
