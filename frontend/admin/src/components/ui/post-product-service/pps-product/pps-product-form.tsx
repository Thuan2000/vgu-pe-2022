import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import PPSProductCategoryInput from "./pps-product-category-input";
import { useRouter } from "next/dist/client/router";
import {
  PPS_CATEGORY_FORM_INDEX,
  PPS_REVIEW_FORM_INDEX,
  PPS_DETAILS_FORM_INDEX,
  PPS_PRICING_FORM_INDEX,
} from "./pps-product-constants";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ppsProductSchema } from "./pps-product-schema";
import PPSProductDetailsInput from "./pps-product-details-input";
import Form from "@components/form";
import PPSProductFooterButton from "./pps-product-footer-button";
import PPSServicePricingInput from "./pps-product-pricing-input";
import PPSProductReview from "./pps-product-review";
import { PPI_PACKAGE_PRICE_NAME } from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-manager";
import { findIndex } from "lodash";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  CreateServiceMutation,
  UpdateServiceMutation,
} from "@graphql/service.graphql";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { ROUTES } from "@utils/routes";

import {
  IPPIPackage,
  IPPIRow,
} from "@components/ui/storybook/inputs/package-pricing-input/ppi-interfaces";
import { IPostProductFormValues } from "./pps-product-interface";
import UnderDevelopment from "@components/under-development";

interface IPPSProductFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const PPSProductForm: React.FC<IPPSProductFormProps> = ({}) => {
  const { t } = useTranslation("form");
  const { locale, query, ...router } = useRouter();
  const [createService, { loading }] = useCreateServiceMutation({
    onCompleted: handleCreatedService,
  });

  const [updateService, { loading: updating }] = useUpdateServiceMutation({
    onCompleted: handleUpdatedService,
  });

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
    formState: { errors, dirtyFields },
    trigger,
    getValues,
    setError,
    handleSubmit,
  } = useForm<IPostProductFormValues>({
    resolver: yupResolver(ppsProductSchema),
  });

  // Changing section if there's an error and user submitting
  useEffect(() => {
    if (errors && errors.category && formPosition > PPS_CATEGORY_FORM_INDEX)
      changeSection(PPS_CATEGORY_FORM_INDEX);
    else if (errors && errors.details && formPosition > PPS_DETAILS_FORM_INDEX)
      changeSection(PPS_DETAILS_FORM_INDEX);
    else if (errors && errors.pricing && formPosition > PPS_PRICING_FORM_INDEX)
      changeSection(PPS_PRICING_FORM_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  function isDirtyCategory() {
    return !!dirtyFields.category;
  }

  // Redirect to first section if user jump using query
  // useEffect(() => {
  //   if (formPosition > PPS_CATEGORY_FORM_INDEX && !isDirtyCategory())
  //     changeSection(PPS_CATEGORY_FORM_INDEX);
  // }, []);

  async function handleNextClick() {
    if (formPosition === PPS_CATEGORY_FORM_INDEX) {
      const data = await trigger("category");
      if (!data) return;
    }
    if (formPosition === PPS_DETAILS_FORM_INDEX) {
      const data = await trigger("details");
      if (!data) return;
    }
    if (formPosition === PPS_PRICING_FORM_INDEX) {
      const isValid =
        !!getValues("pricing.packages") || !!getValues("pricing.price");
      const data = await trigger("pricing");
      if (!data || !isValid) {
        setError("pricing", { message: "pricing-not-setted-error" });
        return;
      }
    }
    if (formPosition >= PPS_REVIEW_FORM_INDEX) return;
    changeSection(formPosition + 1);
  }

  function fireSuccessErrorMessage(success: boolean, message: string) {
    if (success) {
      Swal.fire({
        icon: "success",
        title: t("serviceCreated-title"),
        text: t("serviceCreated-text"),
        confirmButtonText: t("serviceCreated-button-label"),
      });

      router.replace(`${ROUTES.POSTED_PRODUCT_SERVICE}?target=service`);
    } else if (!success) alert(t(`CREATE-SERVICES-${message}-ERROR`));
  }

  function handleCreatedService({
    createService: { message, success },
  }: CreateServiceMutation) {
    fireSuccessErrorMessage(success, message);
  }

  function handleUpdatedService({
    updateService: { message, success },
  }: UpdateServiceMutation) {
    fireSuccessErrorMessage(success, message);
  }

  /**
   *
   * @param rawPackages All the packages and the rows
   * @returns {formattedPackages[], lowestPrice, maximumPrice}
   */
  function processRawPackages(
    packages: IPPIPackage[] = [],
    rows: IPPIRow[] = []
  ) {
    let minPrice = Number.MAX_VALUE;
    let maxPrice = Number.MIN_VALUE;
    if (!packages?.length) return;
    const formatedPackages = packages.map((pkg) => {
      const newPackage = Object.assign({}, pkg);
      delete newPackage.packageRows;

      const newPrs = pkg?.packageRows?.flatMap((pr) => {
        const idx = findIndex(rows, (r) => r.id === pr.rowId);

        if (idx === -1) return [];
        const row = rows[idx];

        // Getting the price
        if (row.name === PPI_PACKAGE_PRICE_NAME && pr.value <= minPrice)
          minPrice = pr.value;
        if (row.name === PPI_PACKAGE_PRICE_NAME && pr.value >= maxPrice)
          maxPrice = pr.value;

        return {
          ...pr,
          value: JSON.stringify(pr?.value),
        };
      });
      newPackage.packageRows = newPrs as any;

      return newPackage;
    });

    return { formatedPackages, minPrice, maxPrice };
  }

  function onSubmit(values: IPostProductFormValues) {
    const { category, details, pricing } = values;
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2 space-y-2">
      <div
        className={
          formPosition === PPS_REVIEW_FORM_INDEX ? "sm:w-full" : "sm:w-2/3"
        }
      >
        {formPosition === PPS_CATEGORY_FORM_INDEX && (
          <PPSProductCategoryInput
            errors={errors}
            trigger={trigger}
            control={control}
            register={register}
          />
        )}

        {formPosition === PPS_DETAILS_FORM_INDEX && (
          <PPSProductDetailsInput
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

        {formPosition === PPS_REVIEW_FORM_INDEX && (
          <PPSProductReview
            changeSection={changeSection}
            getValues={getValues}
          />
        )}
      </div>

      <PPSProductFooterButton
        loading={loading || updating}
        onNextClick={handleNextClick}
        onBackClick={handleBackClick}
        formPosition={formPosition}
      />
    </Form>
  );
};
export default PPSProductForm;
