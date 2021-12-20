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
  PR_DETAILS_FORM_INDEX,
  requiredGeneralInputNames,
  PR_GENERAL_FORM_INDEX,
  PR_CHECK_FORM_INDEX,
} from "./post-tender-constants";
import CheckSection from "./check-section";
import {
  useCreateBuyingRequestMutation,
  useUpdateBuyingRequestMutation,
} from "@graphql/buying-request.graphql";
import { ROUTES } from "@utils/routes";
import {
  IBuyingRequest,
  ICreateBuyingRequestInput,
  IResponse,
  IUpdateBuyingRequestInput,
} from "@graphql/types.graphql";
import {
  getCompanyId,
  getCompanyName,
  getLoggedInUser,
} from "@utils/functions";
import { getDefaultValue } from "./ptf-utils";

interface IPostTenderFormParams {
  initValue?: IBuyingRequest;
}

const PostTenderForm: React.FC<IPostTenderFormParams> = ({ initValue }) => {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    trigger,
  } = useForm<PostRequestFormValue>({
    resolver: yupResolver(PostRequestSchema),
    // @TODO Find out what happened
    defaultValues: getDefaultValue(initValue) as any,
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
    if (formPosition > PR_GENERAL_FORM_INDEX && !isValidGeneralForm()) {
      changeSection(PR_GENERAL_FORM_INDEX);
      return;
    } else if (formPosition > PR_DETAILS_FORM_INDEX && !isValidDetailsForm()) {
      changeSection(PR_GENERAL_FORM_INDEX);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changing section if there's an error
  useEffect(() => {
    if (errors && errors.general && formPosition > PR_GENERAL_FORM_INDEX) {
      changeSection(1);
      return;
    } else if (errors.details && formPosition > PR_DETAILS_FORM_INDEX) {
      changeSection(2);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  async function onSubmit(inputValues: PostRequestFormValue) {
    const { general, details } = inputValues;

    // All of this variable need tobe processed
    const { industry, category, ...generalRest } = general;
    // @NOTE :: This should be changed later when programmer has nothing to do :V
    const { allowedCompany, endDate, sourceType, location, ...detailsRest } =
      details;

    const locationName = location.name;
    const industryId = parseInt(industry.id + "");
    const categoryId = parseInt(category.id + "");

    const coverImage = generalRest?.gallery?.[0];

    const userId = getLoggedInUser()?.id;

    const values: ICreateBuyingRequestInput | IUpdateBuyingRequestInput = {
      companyId: getCompanyId(),
      [initValue ? "updatedById" : "createdById"]: getLoggedInUser()?.id,
      location: locationName,
      industryId,
      categoryId,
      sourceTypeId: sourceType?.id,
      endDate: new Date(endDate).getTime(),
      coverImage,
      ...(!!initValue ? { updatedById: userId! } : { createdById: userId! }),
      ...allowedCompany,
      ...generalRest,
      ...detailsRest,
    };

    if (!!initValue) {
      // Old gallery is the posted gallery files
      await updateBr({
        variables: {
          id: parseInt(initValue.id),
          newValue: values as IUpdateBuyingRequestInput,
        },
      });
    } else
      await createBuyingRequest({
        variables: { input: values as ICreateBuyingRequestInput },
      });
  }

  async function handleNextClick() {
    if (formPosition === PR_GENERAL_FORM_INDEX) {
      const data = await trigger("general");
      if (!data) return;
    }
    if (formPosition === PR_DETAILS_FORM_INDEX) {
      const data = await trigger("details");
      if (!data) return;
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
      className="relative pb-5 mb-0 md:w-full"
    >
      {formPosition === PR_GENERAL_FORM_INDEX && (
        <GeneralForm
          initValue={initValue}
          trigger={trigger}
          control={control}
          getValues={getValues}
          register={register}
          errors={errors}
        />
      )}

      {formPosition === PR_DETAILS_FORM_INDEX && (
        <DetailsInput
          initValue={initValue}
          control={control}
          trigger={trigger}
          register={register}
          errors={errors}
          getValues={getValues}
        />
      )}

      {formPosition === PR_CHECK_FORM_INDEX && (
        <CheckSection getValues={getValues} changeSection={changeSection} />
      )}

      <div className="flex flex-col justify-between relative md:h-10 w-full">
        {/* <Button
          type="button"
          variant="cancel"
          size="small"
          // onClick={handleBackClick}
          className={`${formPosition <= 1 && "invisible hidden"} md:w-40`}
        >
          {t("saveDraft-button-label")}
        </Button> */}
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
export default PostTenderForm;
