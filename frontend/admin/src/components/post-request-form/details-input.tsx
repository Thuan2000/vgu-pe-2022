import React from "react";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from ".";
import Input from "@components/ui/storybook/inputs/input";
import NumberInputController from "@components/ui/storybook/inputs/number-input";
import AdditionalForm from "./additional-form";
import DocumentInput from "@components/ui/storybook/document-input";
import { useProductNamesQuery } from "@graphql/product.graphql";
import ProductNameSelect from "@components/ui/post-request/product-name-input";

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

  return (
    <>
      <ProductNameSelect
        control={control}
        name="productName"
        onCreateOption={(value) => {
          console.log(value);
        }}
        isLoading={loading}
        options={data?.productNames as any}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.name}
      />
      <Input
        noPrefix
        numberQueue={1}
        {...register("productName")}
        className="my-6 w-full"
        label={t("post-request-productName-label")}
        placeholder={t("post-request-productName-placeholder")}
        error={errors?.productName?.message}
      />
      <NumberInputController
        className="my-6 w-full"
        name="budget"
        control={control}
        label={t("post-request-budget-label")}
        placeholder={t("post-request-budget-placeholder")}
        numberQueue={2}
        suffix=" ₫"
        allowNegative={false}
        error={errors?.budget?.message}
      />
      <NumberInputController
        className="my-6 w-full"
        label={t("post-request-minOrder-label")}
        placeholder={t("post-request-minOrder-placeholder")}
        numberQueue={3}
        name="minOrder"
        control={control}
        allowNegative={false}
        error={errors?.minOrder?.message}
      />
      <DocumentInput
        accept="image/*"
        control={control}
        name="image"
        multiple
        numberQueue={4}
        label={t("post-request-image-label")}
        error={errors?.image?.message}
      />

      <AdditionalForm register={register} control={control} errors={errors} />
    </>
  );
};

export default DetailsInput;
