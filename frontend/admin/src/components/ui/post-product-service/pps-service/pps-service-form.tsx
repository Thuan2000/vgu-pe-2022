import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { IPostServiceFormValues } from "./pps-service-interface";
import PPSServiceCategoryInput from "./pps-service-category-input";
import { useRouter } from "next/dist/client/router";
import {
  PPS_CATEGORY_FORM_INDEX,
  PPS_CHECK_FORM_INDEX,
  PPS_DETAILS_FORM_INDEX,
  PPS_GENERAL_FORM_INDEX,
  PPS_PRICING_FORM_INDEX,
} from "./pps-service-constants";
import Button from "@components/ui/storybook/button";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ppsServiceSchema } from "./pps-service-schema";
import PPSServiceGeneralInput from "./pps-service-general-input";
import PPSServiceDetailsInput from "./pps-service-details-input";
import Form from "@components/form";
import PPSServiceFooterButton from "./pps-service-footer-button";
import PPSServicePricingInput from "./pps-service-package-pricing-input/pps-service-pricing-input";

interface IPPSServiceFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const PPSServiceForm: React.FC<IPPSServiceFormProps> = () => {
  const { query, ...router } = useRouter();

  const formPosition = parseInt(query.formPosition as string) || 1;

  function changeSection(newPosition: number) {
    const { pathname } = router;
    router.replace({
      pathname,
      query: { ...query, formPosition: newPosition },
    });
  }

  const {
    control,
    register,
    formState: { errors },
    trigger,
    handleSubmit,
  } = useForm<IPostServiceFormValues>({
    resolver: yupResolver(ppsServiceSchema),
  });

  async function handleNextClick() {
    if (formPosition === PPS_CATEGORY_FORM_INDEX) {
      const data = await trigger("category");
      if (!data) return;
    }
    if (formPosition === PPS_GENERAL_FORM_INDEX) {
      const data = await trigger("general");
      if (!data) return;
    }
    if (formPosition >= PPS_CHECK_FORM_INDEX) return;
    changeSection(formPosition + 1);
  }

  function onSubmit(value: IPostServiceFormValues) {
    console.log(value);
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2 space-y-2">
      <div className="sm:w-2/3">
        {formPosition === PPS_CATEGORY_FORM_INDEX && (
          <PPSServiceCategoryInput
            errors={errors}
            trigger={trigger}
            control={control}
            register={register}
          />
        )}

        {formPosition === PPS_GENERAL_FORM_INDEX && (
          <PPSServiceGeneralInput
            errors={errors}
            trigger={trigger}
            control={control}
            register={register}
          />
        )}

        {formPosition === PPS_DETAILS_FORM_INDEX && (
          <PPSServiceDetailsInput
            errors={errors}
            trigger={trigger}
            control={control}
            register={register}
          />
        )}

        {formPosition === PPS_PRICING_FORM_INDEX && (
          <PPSServicePricingInput
            errors={errors}
            trigger={trigger}
            control={control}
            register={register}
          />
        )}
      </div>

      <PPSServiceFooterButton
        onNextClick={handleNextClick}
        onBackClick={handleBackClick}
        formPosition={formPosition}
      />
    </Form>
  );
};
export default PPSServiceForm;
