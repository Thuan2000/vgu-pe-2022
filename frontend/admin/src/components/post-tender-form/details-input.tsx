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
import ParticipantFilterForm from "./participant-filter-form";
import DocumentInput from "@components/ui/storybook/document-input";
import { useProductNamesQuery } from "@graphql/product.graphql";
import ProductNameSelect from "@components/ui/post-request/product-name-input";
import {
  IBuyingRequest,
  IIndustry,
  IProductName,
} from "@graphql/types.graphql";
import SelectInput from "@components/ui/storybook/select-input";
import PRFBudgetInput from "./details-form/ptf-budget-input";
import PRFQuantityInput from "./details-form/prf-quantity-input";
import DateInput from "@components/ui/storybook/inputs/date-input";
import { IVietnamCity, vietnamCities } from "@utils/vietnam-cities";
import { ISourceType, sourceTypes } from "src/datas/source-type";
import { useRouter } from "next/dist/client/router";

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

  const { locale } = useRouter();

  useEffect(() => {
    refetchProductNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.productNames)
      setProductNames(data.productNames as Array<IProductName>);
  }, [data?.productNames]);
  return (
    <div className="md:w-2/3 space-y-3 sm:mb-5">
      <PRFBudgetInput
        errors={errors}
        trigger={trigger}
        control={control}
        numberQueue={1}
      />

      <PRFQuantityInput
        register={register}
        errors={errors}
        numberQueue={2}
        trigger={trigger}
        control={control}
      />

      <DateInput
        control={control}
        name="details.endDate"
        locale={locale}
        required
        minDate={new Date()}
        placeholder={t("post-request-endDate-placeholder")}
        error={t(errors?.details?.endDate?.message || "")}
        label={`${t("post-request-endDate-label")}`}
        numberQueue={3}
      />

      <SelectInput
        name="details.location"
        numberQueue={4}
        required
        label={`${t("post-request-location-label")}`}
        placeholder={t("post-request-location-placeholder")}
        control={control}
        options={vietnamCities}
        onChange={(_) => {
          trigger("details.location");
        }}
        getInitialValue={(option?: IVietnamCity) =>
          option?.name === (initValue?.location as string)
        }
        error={t((errors?.details?.location as any)?.message || "")}
        getOptionLabel={(option: IVietnamCity) => option.name}
        getOptionValue={(option: IVietnamCity) => option.name}
      />

      <ParticipantFilterForm
        initValue={initValue}
        register={register}
        control={control}
        errors={errors}
      />

      <SelectInput
        name="details.sourceType"
        numberQueue={6}
        label={`${t("post-request-sourceType-label")}`}
        placeholder={t("post-request-sourceType-placeholder")}
        control={control}
        options={sourceTypes}
        onChange={(_) => {
          trigger("details.sourceType");
        }}
        isClearable
        getInitialValue={(option?: ISourceType) =>
          option?.id === initValue?.sourceTypeId
        }
        error={t((errors?.details?.sourceType as any)?.message || "")}
        getOptionLabel={(option: ISourceType) =>
          t("source-type:" + option.label)
        }
        getOptionValue={(option: ISourceType) => option.id + ""}
      />
    </div>
  );
};

export default DetailsInput;
