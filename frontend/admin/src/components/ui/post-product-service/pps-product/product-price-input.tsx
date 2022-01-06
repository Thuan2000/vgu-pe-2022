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
      <div className={`mt-3`}></div>
    </div>
  );
};
export default ProductPriceInput;
