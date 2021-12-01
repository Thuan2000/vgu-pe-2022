import Form from "@components/form";
import { ICompany, IFile } from "@graphql/types.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { isEmpty } from "lodash";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../storybook/button";
import ECAdditionalInput from "./ec-additional-input";
import {
  EC_DETAILS_FORM_INDEX,
  EC_GENERAL_FORM_INDEX,
  EC_ADDITIONAL_FORM_INDEX,
} from "./ec-constants";
import ECDetailsInput from "./ec-details-input";
import ECGeneralInput from "./ec-general-input";
import { ECFormResolver } from "./ec-resolver";
import { ECFormValues } from "./ec-schema";

interface ICompanyDetailsFormProps {
  initValue: ICompany;
}

// @URGENT Check this again
function getDefaultValue(initValue: ICompany) {
  const { settings } = initValue || {};
  const data: any = {
    general: {
      name: initValue.name,
      description: initValue.description,
      establishmentDate: (initValue as any).establishmentDate,
      industryId: (initValue as any).industryId,

      coverImage: settings?.coverImage as IFile,
      profileImage: settings?.profileImage as IFile,
      contactNumber: settings?.contactNumber as string,
      employeeAmount: (settings as any)?.employeeAmount,
    },
    details: {
      branches: settings?.branches as any,
      factories: settings?.factories as any,
      warehouses: settings?.warehouses as any,
    },
    additional: {
      licenseFiles: initValue.licenseFiles,
      gallery: settings?.gallery || [],
    },
  };

  return data;
}

const CompanyDetailsForm: React.FC<ICompanyDetailsFormProps> = ({
  initValue,
}) => {
  const { t } = useTranslation("form");
  const {
    register,
    control,
    trigger,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<ECFormValues>({
    resolver: yupResolver(ECFormResolver),
    ...(!!initValue ? { defaultValues: getDefaultValue(initValue) } : {}),
  });
  const { query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;

  useEffect(() => {
    if (formPosition > EC_GENERAL_FORM_INDEX && isEmpty(dirtyFields.general))
      changeSection(EC_GENERAL_FORM_INDEX);
  });

  function changeSection(newPosition: number) {
    const { pathname } = router;
    router.replace({
      pathname,
      query: { ...query, formPosition: newPosition },
    });
  }

  async function handleNextClick() {
    if (formPosition === EC_GENERAL_FORM_INDEX) {
      const data = await trigger("general");
      if (!data) return;
    }
    if (formPosition === EC_DETAILS_FORM_INDEX) {
      const data = await trigger("details");
      if (!data) return;
    }
    if (formPosition >= EC_ADDITIONAL_FORM_INDEX) {
      const data = await trigger("additional");
      if (!data) return;
      return;
    }

    changeSection(formPosition + 1);
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  function onSubmit(value: ECFormValues) {
    console.log(value);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {formPosition === EC_GENERAL_FORM_INDEX && (
        <ECGeneralInput
          register={register}
          control={control}
          errors={errors}
          trigger={trigger}
        />
      )}

      {formPosition === EC_DETAILS_FORM_INDEX && (
        <ECDetailsInput
          setValue={setValue}
          register={register}
          control={control}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
        />
      )}

      {formPosition === EC_ADDITIONAL_FORM_INDEX && (
        <ECAdditionalInput
          register={register}
          control={control}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
        />
      )}

      <div className="fic justify-between">
        <Button variant="cancel">{t("previewCompany-button-label")}</Button>
        <div className="flex flex-col md:flex-row justify-between md:w-1/3">
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={handleBackClick}
            className={`${
              formPosition <= 1 && "invisible hidden md:block"
            } md:w-1/2.5 my-2 md:my-0 text-primary`}
          >
            {t("back-button-label")}
          </Button>

          <Button
            type={
              formPosition === EC_ADDITIONAL_FORM_INDEX ? "submit" : "button"
            }
            onClick={handleNextClick}
            size="small"
            className="md:w-1/2.5"
            // loading={creating || updating}
            autoFocus={formPosition === EC_ADDITIONAL_FORM_INDEX}
          >
            {t(
              formPosition === EC_ADDITIONAL_FORM_INDEX
                ? "update-company-button-label"
                : "next-section-button-label"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default CompanyDetailsForm;
