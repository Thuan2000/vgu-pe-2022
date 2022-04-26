import React from "react";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  useFormContext,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import BidParticipantFilterInput from "./bid-participant-filter-input";

interface IParticipantFormProps {}

const ParticipantFilterForm: React.FC<IParticipantFormProps> = ({}) => {
  const { t } = useTranslation("form");

  const {
    control,
    formState: { errors },
  } = useFormContext<PostRequestFormValue>();

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
          allowNegative={false}
          max={40}
        />
        <BidParticipantFilterInput
          control={control}
          name={"details.allowedCompany.minSupplierSells"}
          suffix={` ${t("sells-suffix")}`}
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
