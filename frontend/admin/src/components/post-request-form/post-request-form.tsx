import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
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
import {
  useCreateBuyingRequestMutation,
  useUpdateBuyingRequestMutation,
} from "@graphql/buying-request.graphql";
import { ROUTES } from "@utils/routes";
import { IBuyingRequest, IResponse } from "@graphql/types.graphql";
import {
  getCompanyId,
  getCompanyName,
  getLoggedInUser,
} from "@utils/functions";
import { getDefaultValue } from "./prf-utils";

interface IPostRequestFormParams {
  initValue?: IBuyingRequest;
}

const PostRequestForm: React.FC<IPostRequestFormParams> = ({ initValue }) => {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    trigger,
  } = useForm<PostRequestFormValue>({
    resolver: yupResolver(PostRequestSchema),
    defaultValues: getDefaultValue(initValue),
  });

  const { query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;
  const { t } = useTranslation("form");
  const [createBuyingRequest, { loading: creating }] =
    useCreateBuyingRequestMutation({
      onCompleted: ({ createBuyingRequest }) =>
        handleCreateUpdateMutationComplete(createBuyingRequest),
    });

  const [updateBr, { loading: updating }] = useUpdateBuyingRequestMutation({
    onCompleted: ({ updateBuyingRequest }) =>
      handleCreateUpdateMutationComplete(updateBuyingRequest),
  });

  function handleCreateUpdateMutationComplete({ message, success }: IResponse) {
    if (success) router.push(ROUTES.POSTED_REQUESTS);
    else if (success === false) {
      alert(t(`BUYING_REQUEST-${message}-ERROR`));
      return;
    }
  }
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
    if (errors && errors.general && formPosition > GENERAL_FORM_INDEX) {
      changeSection(1);
      return;
    } else if (errors.additional && formPosition > DETAILS_FORM_INDEX) {
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
    const {
      productName: product,
      industry,
      categories,
      gallery,
      ...detailsRest
    } = details;
    const { allowedCompany, ...additionalRest } = additional;

    const locationName = location.name;
    const productName = product.name;
    const industryId = parseInt(industry.id + "");
    const categoryIds = categories.map((c) => parseInt(c.id + ""));

    const oldGallery: any[] = [];
    const newGallery = gallery?.filter((imgOrUpload: any) => {
      if (imgOrUpload.hasOwnProperty("__typename")) {
        const { __typename, localUrl, ...img } = imgOrUpload;
        oldGallery.push(img);
        return false;
      }
      return true;
    });

    const values: any = {
      companyId: getCompanyId(),
      companyName: getCompanyName(),
      [initValue ? "updatedById" : "createdById"]: getLoggedInUser()?.id,
      location: locationName,
      productName,
      endDate: new Date(endDate).getTime(),
      industryId,
      categoryIds,
      // newGallery is only gallery.filter and remove all non file
      [initValue ? "gallery" : "gallery"]: newGallery,
      allowedCompany,
      ...generalRest,
      ...detailsRest,
      ...additionalRest,
    };

    if (initValue) {
      // Old gallery is the posted gallery files
      values["oldGallery"] = oldGallery;
      await updateBr({
        variables: {
          id: parseInt(initValue.id),
          newValue: values,
        },
      });
    } else
      await createBuyingRequest({
        variables: { input: values },
      });
  }

  async function handleNextClick() {
    if (formPosition === GENERAL_FORM_INDEX) {
      const data = await trigger("general");
      if (!data) return;
    }
    if (formPosition === DETAILS_FORM_INDEX && !isValidDetailsForm()) {
      trigger("details");
      return;
    }
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
        <GeneralForm
          initValue={initValue}
          trigger={trigger}
          control={control}
          register={register}
          errors={errors}
        />
      )}

      {formPosition === DETAILS_FORM_INDEX && (
        <DetailsInput
          initValue={initValue}
          control={control}
          trigger={trigger}
          register={register}
          errors={errors}
          getValues={getValues}
        />
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
            loading={creating || updating}
            autoFocus={formPosition === 3}
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
