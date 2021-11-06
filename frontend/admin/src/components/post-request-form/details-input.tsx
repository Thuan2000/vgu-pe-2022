import React, { useState, useEffect } from "react";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import AdditionalForm from "./additional-form";
import DocumentInput from "@components/ui/storybook/document-input";
import { useProductNamesQuery } from "@graphql/product.graphql";
import ProductNameSelect from "@components/ui/post-request/product-name-input";
import {
  IBuyingRequest,
  IIndustry,
  IProductName,
} from "@graphql/types.graphql";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import InlineLabel from "./inline-label";
import Input from "@components/ui/storybook/inputs/input";
import InlineFormInputWrapper from "./inline-form-input-wrapper";
import SelectInput from "@components/ui/storybook/select-input";
import { useCategoriesQuery } from "@graphql/category.graphql";
import { useIndustriesQuery } from "@graphql/industry.graphql";

const INLINE_LABEL_WIDTH = "85px";

interface IGeneralInputProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
  trigger: UseFormTrigger<PostRequestFormValue>;
  initValue?: IBuyingRequest;
}

const DetailsInput: React.FC<IGeneralInputProps> = ({
  register,
  control,
  initValue,
  trigger,
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
    parseInt(initValue?.industry?.id + "") || -1
  );

  const { data: industriesData, loading: industriesLoading } =
    useIndustriesQuery();

  const {
    data: categoriesData,
    loading: categoriesLoading,
    refetch,
  } = useCategoriesQuery({ variables: { industryId: industryId } });

  useEffect(() => {
    if (industryId !== -1) refetch({ industryId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industryId]);

  const categories = categoriesData?.categories;
  const industries = industriesData?.industries;

  // Append to fields on first run

  // @componentDidMount
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
        label={`${t("post-request-productName-label")} (*)`}
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
      <div className="my-6 w-full">
        <InputLabel
          numberQueue={2}
          label={`${t("post-request-budget-label")}*`}
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-8">
          <InlineFormInputWrapper>
            <InlineLabel
              labelWidth={INLINE_LABEL_WIDTH}
              text={t("min-budget-label")}
            />
            <NumberInput
              name="details.minBudget"
              noLabel
              control={control}
              placeholder={t("post-request-budget-placeholder")}
              suffix=" ₫"
              allowNegative={false}
              error={errors?.details?.minBudget?.message}
            />
          </InlineFormInputWrapper>
          <InlineFormInputWrapper>
            <InlineLabel
              labelWidth={INLINE_LABEL_WIDTH}
              text={t("max-budget-label")}
            />
            <NumberInput
              name="details.maxBudget"
              noLabel
              control={control}
              placeholder={t("post-request-budget-placeholder")}
              suffix={` ${t("budget-sign")}`}
              allowNegative={false}
              error={errors?.details?.maxBudget?.message}
            />
          </InlineFormInputWrapper>
        </div>
      </div>
      <div className="my-6 w-full">
        <InputLabel
          label={`${t("post-request-minOrder-label")}*`}
          numberQueue={3}
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-8">
          <InlineFormInputWrapper>
            <InlineLabel
              labelWidth={INLINE_LABEL_WIDTH}
              text={t("quantity-label")}
            />
            <NumberInput
              noLabel
              placeholder={t("post-request-minOrder-placeholder")}
              name="details.minOrder"
              control={control}
              allowNegative={false}
              error={errors?.details?.minOrder?.message}
            />
          </InlineFormInputWrapper>
          <InlineFormInputWrapper>
            <InlineLabel
              labelWidth={INLINE_LABEL_WIDTH}
              text={t("unit-label")}
            />
            <Input
              noLabel
              placeholder={t("post-request-minOrder-placeholder")}
              {...register("details.unit")}
              error={errors?.details?.minOrder?.message}
            />
          </InlineFormInputWrapper>
        </div>
      </div>

      <SelectInput
      // TODO: based on language, choose either option.nameVn or option.En
        getOptionLabel={(option) => option.label || option.nameVn}
        getOptionValue={(option) => option.value || option.nameVn}
        control={control}
        options={industries || []}
        numberQueue="4"
        className="my-6"
        onChange={(industry: IIndustry) => {
          trigger("details.industry");
          setIndustryId(parseInt(industry?.id || "-1"));
        }}
        error={(errors.details?.industry as any)?.message}
        loading={industriesLoading}
        name="details.industry"
        label={`${t("industry-label")}*`}
        placeholder={t("industry-placeholder")}
      />

      <SelectInput
        getOptionLabel={(option) => option.label || option.name}
        getOptionValue={(option) => option.value || option.name}
        control={control}
        options={categories || []}
        getInitialValue={(option) => option.id === initValue?.industry.id}
        numberQueue="5"
        className="my-6"
        onChange={(_) => {
          trigger("details.categories");
        }}
        error={(errors.details?.categories as any)?.message}
        loading={categoriesLoading}
        isMulti
        name="details.categories"
        label={`${t("categories-label")}*`}
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
