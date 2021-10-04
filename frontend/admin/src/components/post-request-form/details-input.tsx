import React, { useState, useEffect } from "react";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import AdditionalForm from "./additional-form";
import DocumentInput from "@components/ui/storybook/document-input";
import { useProductNamesQuery } from "@graphql/product.graphql";
import ProductNameSelect from "@components/ui/post-request/product-name-input";
import { IProductName } from "@graphql/types.graphql";
import InputLabel from "@components/ui/storybook/inputs/input-label";

interface IGeneralInputProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
}

const DetailsInput: React.FC<IGeneralInputProps> = ({
  register,
  control,
  errors,
}) => {
  const { t } = useTranslation("form");
  const { data, loading } = useProductNamesQuery();
  const [productNames, setProductNames] = useState<Array<IProductName>>(
    data?.productNames as Array<IProductName>
  );

  useEffect(() => {
    if (data?.productNames)
      setProductNames(data.productNames as Array<IProductName>);
  }, [data?.productNames]);

  return (
    <div className="md:w-4/6">
      <ProductNameSelect
        className="my-6 w-full"
        control={control}
        name="details.productName"
        isLoading={loading}
        label={`${t("post-request-productName-label")}*`}
        numberQueue={1}
        placeholder={t("post-request-productName-placeholder")}
        options={productNames as any}
        getOptionLabel={(option: any) => option.label || option.name}
        getOptionValue={(option: any) => option.label || option.name}
        error={(errors?.details?.productName as any)?.message}
      />
      <div className="my-6 w-full">
        <InputLabel
          numberQueue={2}
          label={`${t("post-request-budget-label")}*`}
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-8">
          <div className="flex-items-center mb-1 md:mb-0">
            <div className="flex-items-center">
              <p className="font-semibold min-w-12">{t("min-budget-label")}</p>
              <p className="ml-2 mr-5">:</p>
            </div>
            <NumberInput
              name="details.minBudget"
              noLabel
              control={control}
              placeholder={t("post-request-budget-placeholder")}
              suffix=" ₫"
              allowNegative={false}
              error={errors?.details?.minBudget?.message}
            />
          </div>
          <div className="flex-items-center">
            <div className="flex-items-center">
              <p className="font-semibold min-w-12">{t("max-budget-label")}</p>
              <p className="ml-2 mr-5">:</p>
            </div>
            <NumberInput
              name="details.maxBudget"
              noLabel
              control={control}
              placeholder={t("post-request-budget-placeholder")}
              suffix={` ${t("budget-sign")}`}
              allowNegative={false}
              error={errors?.details?.maxBudget?.message}
            />
          </div>
        </div>
      </div>
      <NumberInput
        className="my-6 w-full"
        label={`${t("post-request-minOrder-label")}*`}
        placeholder={t("post-request-minOrder-placeholder")}
        numberQueue={3}
        name="details.minOrder"
        control={control}
        allowNegative={false}
        error={errors?.details?.minOrder?.message}
      />
      <DocumentInput
        accept="image/*"
        control={control}
        name="details.images"
        multiple
        numberQueue={4}
        label={t("post-request-images-label")}
        error={errors?.details?.images?.message}
      />

      <AdditionalForm register={register} control={control} errors={errors} />
    </div>
  );
};

export default DetailsInput;
