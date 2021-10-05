import React from "react";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import SelectInput from "@components/ui/storybook/select-input";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import { useCategoriesQuery } from "@graphql/category.graphql";

interface IAdditionalFormProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
}

const AdditionalForm: React.FC<IAdditionalFormProps> = ({
  register,
  control,
  errors,
}) => {
  const { t } = useTranslation("form");
  const { data, loading, error } = useCategoriesQuery();

  const categories = data?.categories;

  if (error) console.log(error);

  return (
    <>
      <h3 className="mt-7 mb-3">Additional Information</h3>
      <InputLabel
        numberQueue={"a"}
        queueBackground="blue"
        label={t("who-can-participate-to-bid")}
      />
      <div className="flex-items-center mb-3 ml-8">
        <p className="font-semibold">{t("supplierExperience-label")}</p>
        <p className="ml-2 mr-4">:</p>
        <NumberInput
          control={control}
          name="additional.minSupplierExperience"
          noLabel
          error={errors?.additional?.minSupplierExperience?.message}
          placeholder={t("supplierExperience-placeholder")}
        />
      </div>
      <div className="flex-items-center mb-3 ml-8">
        <p className="font-semibold">{t("rating-label")}</p>
        <p className="ml-2 mr-4">:</p>
        <NumberInput
          control={control}
          name="additional.minSupplierRating"
          noLabel
          error={errors?.additional?.minSupplierRating?.message}
          placeholder={t("minSupplierRating-placeholder")}
        />
      </div>
      <div className="flex-items-center ml-8">
        <p className="font-semibold">{t("minSuplierSells-label")}</p>
        <p className="ml-2 mr-4">:</p>
        <NumberInput
          control={control}
          name="additional.minSuplierSells"
          noLabel
          error={errors?.additional?.minSuplierSells?.message}
          placeholder={t("minSuplierSells-placeholder")}
        />
      </div>

      <SelectInput
        getOptionLabel={(option) => option.label || option.name}
        getOptionValue={(option) => option.value || option.name}
        control={control}
        options={categories || []}
        queueBackground="blue"
        numberQueue="b"
        className="my-6"
        loading={loading}
        isMulti
        name="additional.categories"
        label={t("categories-label")}
        placeholder={t("categories-placeholder")}
      />
    </>
  );
};
export default AdditionalForm;
