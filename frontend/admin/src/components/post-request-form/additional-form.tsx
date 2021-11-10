import React from "react";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import BidParticipantFilterInput from "./bid-participant-filter-input";
import { IBuyingRequest } from "@graphql/types.graphql";

interface IAdditionalFormProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
  initValue?: IBuyingRequest;
}

const AdditionalForm: React.FC<IAdditionalFormProps> = ({
  control,
  errors,
  initValue,
}) => {
  const { t } = useTranslation("form");

  return (
    <>
      <h2 className="mt-7 mb-3">{t("additional-information-check-title")}</h2>

      <InputLabel
        numberQueue="b"
        queueBackground="blue"
        label={t("who-can-participate-to-bid")}
      />
      <BidParticipantFilterInput
        control={control}
        label={t("supplierExperience-label")}
        name={"additional.allowedCompany.minSupplierExperience"}
        suffix={` ${t("experience-suffix-years")}`}
        placeholder={t("supplierExperience-placeholder")}
        min={1}
        error={t(
          errors.additional?.allowedCompany?.minSupplierExperience?.message ||
            ""
        )}
        defaultValue={
          initValue?.allowedCompany?.minSupplierExperience as number
        }
        allowNegative={false}
        max={40}
      />
      <BidParticipantFilterInput
        control={control}
        label={t("rating-label")}
        placeholder={t("rating-placeholder")}
        name={"additional.allowedCompany.minSupplierRating"}
        suffix={` ${t("rating-suffix")}`}
        defaultValue={initValue?.allowedCompany?.minSupplierRating as number}
        min={1}
        error={t(
          errors.additional?.allowedCompany?.minSupplierRating?.message || ""
        )}
        allowNegative={false}
        max={5}
      />
      <BidParticipantFilterInput
        control={control}
        name={"additional.allowedCompany.minSupplierSells"}
        suffix={` ${t("sells-suffix")}`}
        defaultValue={initValue?.allowedCompany?.minSupplierSells as number}
        min={1}
        label={t("minSuplierSells-label")}
        placeholder={t("minSuplierSells-placeholder")}
        error={t(
          errors.additional?.allowedCompany?.minSupplierSells?.message || ""
        )}
        allowNegative={false}
        max={1000000}
      />
    </>
  );
};
export default AdditionalForm;
