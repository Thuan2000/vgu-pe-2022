import { IFile } from "@graphql/types.graphql";
import { findIndex, remove } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IPostProductFormValues } from "../pps-product-interface";
import { IGroupFormValues } from "../product-group-form";
import PPSPVPAllVariationPriceInput from "./pppspvp-all-variation-price-input";
import { getCartesianVariation, getVariationDetails } from "../pppsp-util";
import { useTranslation } from "react-i18next";
import Typography from "@components/ui/storybook/typography";
import PPSProductInlineLabel from "../pps-product-inline-label";
import VariationPriceInputItem from "./variation-item";
import VariationPriceInputItemWrapper from "./variation-price-input-item-wrapper";

export interface IProductVariation {
  id: string;
  title: string;
  price: number;
  image?: IFile;
  options: IVariationOpt[];
}

interface IPPSPVPManagerProps {
  value: IProductVariation[];
  onChange: (e: IProductVariation[]) => void;
}

export interface IVariationOpt {
  name: string;
  value: string;
}

const PPSPVPManager: React.FC<IPPSPVPManagerProps> = ({
  value = [],
  onChange,
}) => {
  const { t } = useTranslation("form");
  const { control, trigger } = useFormContext<IPostProductFormValues>();

  const groups: IGroupFormValues[] = useWatch<IPostProductFormValues>({
    control,
    name: "pricing.groups",
  }) as any;
  const variationOptions = getCartesianVariation(groups);

  const firstRun = useRef(true);

  const [allPrice, setAllPrice] = useState<number>();

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else synchronizeValueAndVDs();
  }, [groups]);

  function synchronizeValueAndVDs() {
    const variationDetails = getVariationDetails(variationOptions);
    const synchronized = variationDetails.map(
      ({ image, price, title, ...rest }) => {
        const idx = findIndex(value, (v) => v.title === title);
        const curr = value[idx];

        return {
          title,
          price: curr?.price || price,
          image: curr?.image || image,
          ...rest,
        };
      }
    );

    onChange(synchronized);
  }

  function handleAllPriceChange() {
    const valuesWithNewPrice: IProductVariation[] = value?.map(
      ({ price, ...rest }) =>
        ({
          price: allPrice,
          ...rest,
        } as any)
    );

    onChange(valuesWithNewPrice);
  }

  function handleSetAllPrice(e: number) {
    setAllPrice(e);
    handleAllPriceChange();
  }

  function handleVariationPriceChange(id: string, newPrice: number) {
    const idx = findIndex(value, (v) => v.id === id);
    if (idx === -1) return;

    value[idx].price = newPrice;
    onChange([...value]);
    trigger("pricing");
  }

  if (!variationOptions?.length) return <div />;

  return (
    <div className={`space-y-5`}>
      <PPSPVPAllVariationPriceInput onSetAllprice={handleSetAllPrice} />

      <div className="flex items-start space-x-5">
        <PPSProductInlineLabel label={t("variation-pricing-input-label")} />

        <div className={`w-full`}>
          <div className={`fic`}>
            <VariationPriceInputItemWrapper isLeftSide isHeader>
              <Typography weight="semibold" text={t("variation-text-title")} />
            </VariationPriceInputItemWrapper>
            <VariationPriceInputItemWrapper isRightSide isHeader>
              <Typography weight="semibold" text={t("price-text-title")} />
            </VariationPriceInputItemWrapper>
          </div>
          {value?.map(({ id, title, price }, idx) => {
            return (
              <VariationPriceInputItem
                isLast={idx === value.length - 1}
                title={title}
                onChange={(e) => handleVariationPriceChange(id, e)}
                value={price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PPSPVPManager;
