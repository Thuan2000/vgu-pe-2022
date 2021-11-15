import React from "react";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import BidParticipantFilterInput from "./bid-participant-filter-input";
import { IBuyingRequest } from "@graphql/types.graphql";

interface IParticipantFormProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
  initValue?: IBuyingRequest;
}

const ParticipantFilterForm: React.FC<IParticipantFormProps> = ({
  control,
  errors,
  initValue,
}) => {
  const { t } = useTranslation("form");

  return (
    <>
      <InputLabel numberQueue="5" label={t("who-can-participate-to-bid")} />
      <div className="ml-8">
        <BidParticipantFilterInput
          control={control}
          label={t("supplierExperience-label")}
          name={"details.allowedCompany.minSupplierExperience"}
          suffix={` ${t("experience-suffix-years")}`}
          placeholder={t("supplierExperience-placeholder")}
          min={1}
          error={t(
            errors.details?.allowedCompany?.minSupplierExperience?.message || ""
          )}
          defaultValue={initValue?.minSupplierExperience as number}
          allowNegative={false}
          max={40}
        />
        <BidParticipantFilterInput
          control={control}
          name={"details.allowedCompany.minSupplierSells"}
          suffix={` ${t("sells-suffix")}`}
          defaultValue={initValue?.minSupplierSells as number}
          min={1}
          label={t("minSuplierSells-label")}
          placeholder={t("minSuplierSells-placeholder")}
          error={t(
            errors.details?.allowedCompany?.minSupplierSells?.message || ""
          )}
          allowNegative={false}
          max={1000000}
        />
      </div>
    </>
  );
};
export default ParticipantFilterForm;
