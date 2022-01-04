import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput, {
  NumInput,
} from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IProductPriceInputProps {}

const ProductPriceInput: React.FC<IProductPriceInputProps> = ({}) => {
  const { t } = useTranslation();

  const [singlePrice, setSinglePrice] = useState<number>();

  function handleSinglePriceChange(e: number | any) {
    setSinglePrice(e);
  }

  return (
    <div>
      <InputLabel
        label={t("product-price-input-label")}
        required={true}
        labelFontSize={"lg"}
      />

      <div className={`mt-3`}>
        <div className="fic space-x-5">
          <Typography
            weight="bold"
            color="black"
            className={`flex-shrink-0`}
            text={`${t("single-price-input-label")} : `}
          />

          <NumInput onChange={handleSinglePriceChange} value={singlePrice} />
        </div>
      </div>
    </div>
  );
};
export default ProductPriceInput;
