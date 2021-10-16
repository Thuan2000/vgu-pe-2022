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
  CHECK_FORM_INDEX,
} from "./post-request-constants";
import CheckSection from "./check-section";
import { getMeData } from "@utils/auth-utils";
import { useCreateBuyingRequestMutation } from "@graphql/buying-request.graphql";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import { ROUTES } from "@utils/routes";
import { IResponse } from "@graphql/types.graphql";
import {
  getCompanyId,
  getCompanyName,
  getLoggedInUserId,
} from "@utils/functions";

type KeyValueSelect = { key: { label: string; value: string }; value: any };

function processRawAC(rawACs: KeyValueSelect[]) {
  const allowedCompany: any = {};

  rawACs.map((rawAC) => {
    if (!rawAC?.key) return;
    allowedCompany[rawAC.key.value] = rawAC.value;
  });

  return allowedCompany;
}

const PostRequestForm = () => {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<PostRequestFormValue>({
    resolver: yupResolver(PostRequestSchema),
    defaultValues: {
      general: {
        endDate: new Date(),
      },
    },
  });

  const { query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;
  const { t } = useTranslation("form");
  const [createBuyingRequest, { loading, error }] =
    useCreateBuyingRequestMutation({
      onCompleted: ({ createBuyingRequest, ...rest }) => {
        const { success, message } = (createBuyingRequest as IResponse) || {};
        if (success) router.push(ROUTES.POSTED_REQUESTS);
        else if (success === false) {
          alert(t(`BUYING_REQUEST-${message}-ERROR`));
          return;
        }
      },
    });

  function changeSection(newPosition: number) {
    const { pathname } = router;
    router.replace({
      pathname,
      query: { ...query, formPosition: newPosition },
    });
  }

  function isValidGeneralForm() {
    let isValid = true;
    requiredGeneralInputNames.forEach((name) => {
      const value = getValues(`general.${name}`);
      if (!value) {
        isValid = false;
        return;
      }
    });
    return isValid;
  }

  function isValidDetailsForm() {
    let isValid = true;
    requiredDetailsInputNames.forEach((name) => {
      const value = getValues(`details.${name}`);
      if (!value) {
        isValid = false;
        return;
      }
    });
    return isValid;
  }

  // Change section when user come to formSection=2 directly not from 1
  useEffect(() => {
    if (formPosition > GENERAL_FORM_INDEX && !isValidGeneralForm()) {
      changeSection(GENERAL_FORM_INDEX);
      return;
    } else if (formPosition > DETAILS_FORM_INDEX && !isValidDetailsForm()) {
      changeSection(GENERAL_FORM_INDEX);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changing section if there's an error
  useEffect(() => {
    if (errors && errors.general) {
      changeSection(1);
      return;
    } else if ((errors && errors.details) || errors.additional) {
      changeSection(2);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  async function onSubmit(inputValues: PostRequestFormValue) {
    const { general, details, additional } = inputValues;

    // All of this variable need tobe processed
    const { location, endDate, ...generalRest } = general;
    // @NOTE :: This should be changed later when programmer has nothing to do :V
    const { productName: product, ...detailsRest } = details;
    const { categories, allowedCompany: rawACs } = additional;

    const allowedCompany = processRawAC(rawACs as any);
    const locationName = location.name;
    const productName = product.name;
    const categoryIds = categories?.map((category) => category.id);

    const values: any = {
      companyId: getCompanyId(),
      companyName: getCompanyName(),
      createdById: getLoggedInUserId(),
      location: locationName,
      productName,
      categories: categoryIds,
      endDate: new Date(endDate).getTime(),
      ...generalRest,
      ...detailsRest,
      allowedCompany,
    };

    await createBuyingRequest({
      variables: { input: values },
    });
  }

  function handleNextClick() {
    if (formPosition === GENERAL_FORM_INDEX && !isValidGeneralForm()) return;
    if (formPosition === DETAILS_FORM_INDEX && !isValidDetailsForm()) return;
    if (formPosition >= 3) return;

    changeSection(formPosition + 1);
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="relative pb-5 mb-0 md:mb-5 md:w-full"
    >
      {formPosition === GENERAL_FORM_INDEX && (
        <GeneralForm control={control} register={register} errors={errors} />
      )}

      {formPosition === DETAILS_FORM_INDEX && (
        <DetailsInput control={control} register={register} errors={errors} />
      )}

      {formPosition === CHECK_FORM_INDEX && (
        <CheckSection getValues={getValues} changeSection={changeSection} />
      )}

      <div className="flex flex-col justify-between relative md:h-10 w-full">
        <Button
          type="button"
          variant="cancel"
          size="small"
          onClick={handleBackClick}
          className={`${formPosition <= 1 && "invisible hidden"} md:w-40`}
        >
          {t("saveDraft-button-label")}
        </Button>
        <div className="flex flex-col md:flex-row justify-between md:w-1/3 md:absolute md:right-0">
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
            type={formPosition < 3 ? "button" : "submit"}
            onClick={handleNextClick}
            size="small"
            className="md:w-1/2.5"
            loading={loading}
          >
            {t(
              formPosition === 3
                ? "post-request-button-label"
                : "next-section-button-label"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default PostRequestForm;
