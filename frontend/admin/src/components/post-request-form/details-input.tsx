import React, { useState, useEffect } from "react";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import AdditionalForm from "./additional-form";
import DocumentInput from "@components/ui/storybook/document-input";
import { useProductNamesQuery } from "@graphql/product.graphql";
import ProductNameSelect from "@components/ui/post-request/product-name-input";
import {
  IBuyingRequest,
  IIndustry,
  IProductName,
} from "@graphql/types.graphql";
import SelectInput from "@components/ui/storybook/select-input";
import { industriesData } from "@utils/industries";
import { getIndustryCategories } from "@utils/categories";
import PRFBudgetInput from "./details-form/prf-budget-input";
import PRFQuantityInput from "./details-form/prf-quantity-input";

interface IGeneralInputProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
  trigger: UseFormTrigger<PostRequestFormValue>;
  initValue?: IBuyingRequest;
  getValues: UseFormGetValues<PostRequestFormValue>;
}

const DetailsInput: React.FC<IGeneralInputProps> = ({
  register,
  control,
  initValue,
  trigger,
  getValues,
  errors,
}) => {
  const { t } = useTranslation("form");
  const {
    data,
    refetch: refetchProductNames,
    loading,
  } = useProductNamesQuery();
  const [productNames, setProductNames] = useState<Array<IProductName>>(
    data?.productNames as Array<IProductName>
  );
  const [industryId, setIndustryId] = useState(
    parseInt(initValue?.industryId + "") ||
      getValues("details.industry.id") ||
      -1
  );

  useEffect(() => {
    refetchProductNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onChange={() => {
          trigger("details.productName");
        }}
        required
        label={t("post-request-productName-label")}
        numberQueue={1}
        placeholder={t("post-request-productName-placeholder")}
        options={productNames || []}
        getOptionLabel={(option: any) => option.label || option.name}
        getOptionValue={(option: any) => option.label || option.name}
        error={(errors?.details?.productName as any)?.message}
        autoFocus={true}
        getInitialValue={(option: any) =>
          (option.label || option.name) === initValue?.productName
        }
      />
      <PRFBudgetInput
        errors={errors}
        trigger={trigger}
        control={control}
        className="my-6 w-full"
      />
      <PRFQuantityInput
        register={register}
        errors={errors}
        trigger={trigger}
        control={control}
        className="my-6 w-full"
      />

      <SelectInput
        getOptionLabel={(option) => t("industry:" + option.label)}
        getOptionValue={(option) => option.id}
        control={control}
        required
        options={industriesData}
        numberQueue="4"
        className="my-6"
        onChange={(industry: IIndustry) => {
          trigger("details.industry");
          setIndustryId(parseInt(industry?.id || "-1"));
        }}
        error={(errors.details?.industry as any)?.message}
        name="details.industry"
        label={t("industry-label")}
        placeholder={t("industry-placeholder")}
      />

      <SelectInput
        getOptionLabel={(option) => t("category:" + option.label)}
        getOptionValue={(option) => option.id}
        required
        noOptionsMessage={() => t("pleaseSelectIndustry-message")}
        control={control}
        options={getIndustryCategories(industryId) || []}
        getInitialValue={(option) => option.id === initValue?.industryId}
        numberQueue="5"
        className="my-6"
        onChange={(_) => {
          trigger("details.categories");
        }}
        error={(errors.details?.categories as any)?.message}
        isMulti
        name="details.categories"
        label={t("categories-label")}
        placeholder={t("categories-placeholder")}
      />

      <DocumentInput
        accept="image/*"
        control={control}
        name="details.gallery"
        multiple
        numberQueue={4}
        label={t("post-request-gallery-label")}
        error={errors?.details?.gallery?.message}
      />

      <AdditionalForm register={register} control={control} errors={errors} />
    </div>
  );
};

export default DetailsInput;
