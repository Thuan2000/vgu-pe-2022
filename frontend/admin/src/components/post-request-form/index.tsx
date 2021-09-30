import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Form from "@components/form";
import GeneralForm from "./general-form";
import Button from "@components/ui/storybook/button";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/dist/client/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DetailsInput from "./details-input";
import {
  DETAILS_FORM_INDEX,
  generalInputNames,
  GENERAL_FORM_INDEX,
} from "./post-request-constants";

export type PostRequestFormValue = {
  name: string;
  endDate: string;
  location: string;
  status: string;
  description: string;
  productName: string;
  budget: number;
  minOrder: number;
  image: any;
};

export const PostRequestSchema = yup.object({
  name: yup.string().required("post-request-name-is-required-error"),
  endDate: yup.string().required("post-request-end-date-required-error"),
  location: yup.object().required("post-request-location-is-required-error"),
  description: yup
    .string()
    .required("post-request-description-is-required-error"),
  // status: yup.string().required("post-request-status-is-required-error"),
});

const PostRequestForm = () => {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<PostRequestFormValue>({
    resolver: yupResolver(PostRequestSchema),
  });

  console.log(errors);

  const { query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;
  const { t } = useTranslation("form");

  function changeSection(newPosition: number) {
    console.log(newPosition);
    const { pathname } = router;
    router.push({
      pathname: pathname,
      query: { ...query, formPosition: newPosition },
    });
  }

  useEffect(() => {
    // if (formPosition > GENERAL_FORM_INDEX)
    //   generalInputNames.forEach((name) => {
    //     const value = getValues(name);
    //     if (!value) {
    //       changeSection(1);
    //       return;
    //     }
    //   });
    // else if (formPosition > DETAILS_FORM_INDEX)
    //   generalInputNames.forEach((name) => {
    //     const value = getValues(name);
    //     if (!value) {
    //       changeSection(2);
    //       return;
    //     }
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(values: PostRequestFormValue) {
    const value = getValues("name");
    if (formPosition < 3) {
      changeSection(formPosition + 1);
      return;
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="pb-5">
      {formPosition === 1 && (
        <GeneralForm control={control} register={register} errors={errors} />
      )}

      {formPosition === 2 && (
        <DetailsInput control={control} register={register} errors={errors} />
      )}

      <div className="flex justify-between">
        <Button style={{ width: "47%" }} variant="outline" size="small">
          {t("save-draft-button-label")}
        </Button>
        <Button style={{ width: "47%" }} size="small">
          {t("next-section-button-label")}
        </Button>
      </div>
    </Form>
  );
};
export default PostRequestForm;
