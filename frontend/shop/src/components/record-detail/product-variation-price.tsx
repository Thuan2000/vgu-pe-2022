import { NumInput } from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import { IVariation, IVariationOption } from "@graphql/types.graphql";
import {
  formatMoneyAmount,
  getMoneySuffix,
  getProductVariationGroup,
  getSelectedVariation,
  getSuffix,
  thousandSeparator,
  viDateFormat,
} from "@utils/functions";
import { groupBy, isEmpty, isEqual } from "lodash";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import ProductVariationOptions from "./product-variation-options";

interface IProductPriceProps {
  variations?: IVariation[];
}

const ProductVariationPrice: React.FC<IProductPriceProps> = ({
  variations,
}) => {
  const { t } = useTranslation("common");

  const [selectedOption, setSelectedOption] = useState({});
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const groups = getProductVariationGroup(variations) || {};

  function selectOption({ name, value }: IVariationOption) {
    (selectedOption as any)[name] = value;
    setSelectedOption({ ...selectedOption });
  }

  function getPriceEstimation() {
    if (!price) return t("please-select-variant-correctly");
    if (!quantity) return t("please-set-quantity");

    return `${thousandSeparator(price)} ${t("budget-sign")}`;
  }

  useEffect(() => {
    if (!quantity) return;

    const selectedVariation = getSelectedVariation(variations!, selectedOption);

    const variationPrice = selectedVariation?.price;
    if (!variationPrice) return;

    setPrice(variationPrice * quantity);
  }, [selectedOption, quantity, variations]);

  return (
    <div className="py-2 mt-3 space-y-3 w-full">
      <div className="flex space-x-[2px]">
        <div className={`space-y-3`}>
          {!isEmpty(groups) &&
            Object.keys(groups).map((k) => {
              const opts = groups[k];
              return (
                <ProductVariationOptions
                  key={k + "variations-group"}
                  options={opts}
                  selectedOption={selectedOption}
                  name={k}
                  onSelect={selectOption}
                />
              );
            })}
        </div>
      </div>
      <div className={`space-x-3 fic`}>
        <NumInput
          onChange={(e) => setQuantity(e)}
          withIncrementor
          withDecrementor
          min={1}
          value={quantity}
          allowNegative={false}
          className="!text-center"
        />
      </div>
      <div className={`fic space-x-3`}>
        <Typography text={`${t("estimated-price")}:`} size="md" />
        <Typography
          text={`${getPriceEstimation()}`}
          size="lg"
          color="primary"
        />
      </div>
    </div>
  );
};
export default ProductVariationPrice;
