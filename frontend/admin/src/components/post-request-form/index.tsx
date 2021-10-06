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
import { getMeData } from "@utils/auth-utils";
import { useCreateBuyingRequestMutation } from "@graphql/buying-request.graphql";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import { ROUTES } from "@utils/routes";
import { IResponse } from "@graphql/types.graphql";

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
      onCompleted: ({ createBuyingRequest }) => {
        const { success, message } = createBuyingRequest as IResponse;
        if (!success) {
          console.log(message);
          alert(t("SOMETHING_WENT_WRONG_ERROR"));
          return;
        }

        Swal.fire({
          icon: "success",
          iconColor: COLORS.GREEN,
          titleText: t("success-title"),
          text: t("post-request-success-text"),
          confirmButtonText: t("to-homepage-button-label"),
          confirmButtonColor: COLORS.GREEN,
        }).then(({ isConfirmed }) => {
          if (isConfirmed) router.push(ROUTES.HOMEPAGE);
        });
      },
    });

  function changeSection(newPosition: number) {
    const { pathname } = router;
    router.push({
      pathname: pathname,
      query: { ...query, formPosition: newPosition },
    });
  }
  // Change section when user come to formSection=2 directly not from 1
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

  // Changing section if there's an error
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

  async function onSubmit(inputValues: PostRequestFormValue) {
    const { general, details, additional } = inputValues;

    // All of this variable need tobe processed
    const { location, endDate, ...generalRest } = general;
    // @NOTE :: This should be changed later when programmer has nothing to do :V
    const { productName: product, ...detailsRest } = details;
    const { categories, ...allowedCompany } = additional;

    const locationName = location.name;
    const productName = product.name;
    const categoryIds = categories.map((category) => category.id);

    const { company } = getMeData();
    const values: any = {
      companyId: company?.id,
      companyName: company?.name,
      location: locationName,
      productName,
      categories: categoryIds,
      endDate: new Date(endDate).getTime(),
      ...generalRest,
      ...detailsRest,
      allowedCompany,
    };

    const { data, errors } = await createBuyingRequest({
      variables: { input: values },
    });
  }

  function handleNextClick() {
    if (formPosition < 3) {
      changeSection(formPosition + 1);
      return;
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="relative pb-5 mb-0 md:mb-5 md:w-full"
    >
      {formPosition === 1 && (
        <GeneralForm control={control} register={register} errors={errors} />
      )}

      {formPosition === 2 && (
        <DetailsInput control={control} register={register} errors={errors} />
      )}

      {formPosition === 3 && (
        <CheckSection getValues={getValues} changeSection={changeSection} />
      )}

      <div className="relative h-10 w-full">
        <div className="flex justify-between md:w-1/3 md:absolute md:right-0">
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
            loading={loading}
          >
            {t("next-section-button-label")}
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default PostRequestForm;
