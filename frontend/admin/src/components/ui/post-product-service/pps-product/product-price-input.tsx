import TrashCanIcon from "@assets/icons/trash-can-icon";
import InlineLabel from "@components/post-tender-form/inline-label";
import Input from "@components/ui/storybook/inputs/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ProductGroupClassificationInput from "./product-group-classification-input";

export interface IGroupClassification {
  id: string;
  name: string;
}

export interface IGroupFormValues {
  name: string;
  classifications: IGroupClassification[];
}

interface IProductPriceInputProps {}

const ProductPriceInput: React.FC<IProductPriceInputProps> = ({}) => {
  const labelWidth = "100px";
  const { t } = useTranslation("form");

  const {
    register,
    control,
    formState: { errors },
  } = useForm<IGroupFormValues>();
  return (
    <div className="p-5 rounded-sm bg-gray-10 space-y-3 bg-opacity-50 border relative">
      <Wrapper>
        <InlineLabel
          text={t("group-price-groupName-input-label")}
          textClass={`font-semibold opacity-90`}
          className={`flex-shrink-0 text-right ${!!errors.name && "mt-1"}`}
          labelWidth={labelWidth}
          narrowColon
        />
        <div className="fic w-full space-x-3">
          <Input className={`w-full`} {...register("name")} />
          <TrashCanIcon className={`invisible`} />
        </div>
      </Wrapper>

      <Wrapper shouldItemStart>
        <InlineLabel
          text={t("group-price-groupClassification-input-label")}
          textClass={`font-semibold opacity-90`}
          className={`flex-shrink-0 text-right ${!!errors.name && "mt-1"} mt-2`}
          labelWidth={labelWidth}
          narrowColon
        />
        <ProductGroupClassificationInput
          control={control}
          name="classifications"
        />
      </Wrapper>
    </div>
  );
};

interface IWrapperProps {
  children: any;
  className?: string;
  shouldItemStart?: boolean;
}

function Wrapper({ children, className, shouldItemStart }: IWrapperProps) {
  return (
    <div
      className={`flex ${
        shouldItemStart ? "items-start" : "items-center"
      } w-full ${className}`}
    >
      {children}
    </div>
  );
}
export default ProductPriceInput;
