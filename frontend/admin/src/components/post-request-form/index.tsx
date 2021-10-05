import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import Form from "@components/form";
import GeneralForm from "./general-form";
import Button from "@components/ui/storybook/button";
import { useRouter } from "next/dist/client/router";
import DetailsInput from "./details-input";
import { PostRequestSchema, PostRequestFormValue } from "./post-request-schema";

import {
  requiredDetailsInputNames,
  DETAILS_FORM_INDEX,
  requiredGeneralInputNames,
  GENERAL_FORM_INDEX,
} from "./post-request-constants";
import CheckSection from "./check-section";

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

  const { query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;
  const { t } = useTranslation("form");

  function changeSection(newPosition: number) {
    const { pathname } = router;
    router.push({
      pathname: pathname,
      query: { ...query, formPosition: newPosition },
    });
  }

  useEffect(() => {
    if (formPosition > GENERAL_FORM_INDEX)
      requiredGeneralInputNames.forEach((name) => {
        const value = getValues(`general.${name}`);
        if (!value) {
          changeSection(1);
          return;
        }
      });
    else if (formPosition > DETAILS_FORM_INDEX)
      requiredDetailsInputNames.forEach((name) => {
        const value = getValues(`details.${name}`);
        if (!value) {
          changeSection(2);
          return;
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errors) {
      if (errors.general) {
        changeSection(1);
        return;
      } else if (errors.details || errors.additional) {
        changeSection(2);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  function onSubmit(values: PostRequestFormValue) {
    console.log(values);
  }

  function handleNextClick() {
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

      {formPosition === 3 && (
        <CheckSection getValues={getValues} changeSection={changeSection} />
      )}

      <div className="flex justify-between">
        <Button
          style={{ width: "47%" }}
          type="button"
          variant="outline"
          size="small"
        >
          {t("save-draft-button-label")}
        </Button>
        <Button
          style={{ width: "47%" }}
          type={formPosition < 3 ? "button" : "submit"}
          onClick={handleNextClick}
          size="small"
        >
          {t("next-section-button-label")}
        </Button>
      </div>
    </Form>
  );
};
export default PostRequestForm;
