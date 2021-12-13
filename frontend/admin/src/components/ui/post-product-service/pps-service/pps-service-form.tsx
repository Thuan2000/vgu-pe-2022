import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { IPostServiceFormValues } from "./pps-service-interface";
import PPSServiceCategoryInput from "./pps-service-category-input";
import { useRouter } from "next/dist/client/router";
import {
  PPS_CATEGORY_FORM_INDEX,
  PPS_REVIEW_FORM_INDEX,
  PPS_DETAILS_FORM_INDEX,
  PPS_ATTACHMENT_FORM_INDEX,
  PPS_PRICING_FORM_INDEX,
} from "./pps-service-constants";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ppsServiceSchema } from "./pps-service-schema";
import PPSServiceAttachmentInput from "./pps-service-attachment-input";
import PPSServiceDetailsInput from "./pps-service-details-input";
import Form from "@components/form";
import PPSServiceFooterButton from "./pps-service-footer-button";
import PPSServicePricingInput from "./pps-service-pricing-input";
import PPSServiceReview from "./pps-service-review";
import {
  IPPIValue,
  PPI_PACKAGE_PRICE_NAME,
} from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-manager";
import { findIndex, isEmpty } from "lodash";
import {
  useCreateServiceMutation,
  CreateServiceMutation,
} from "@graphql/service.graphql";
import { ICreateServiceInput } from "@graphql/types.graphql";
import {
  getCompanyId,
  getCompanyName,
  getLoggedInUser,
} from "@utils/functions";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { ROUTES } from "@utils/routes";
import { ITagInput } from "@graphql/types.graphql";
import { ITagWithNewRecord } from "@utils/interfaces";

interface IPPSServiceFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const PPSServiceForm: React.FC<IPPSServiceFormProps> = () => {
  const { t } = useTranslation("form");
  const { locale, query, ...router } = useRouter();
  const [createService, { loading }] = useCreateServiceMutation({
    onCompleted: handleCreatedService,
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
  } = useForm<IPostServiceFormValues>({
    resolver: yupResolver(ppsServiceSchema),
  });

  // Changing section if there's an error and user submitting
  useEffect(() => {
    if (errors && errors.category && formPosition > PPS_CATEGORY_FORM_INDEX)
      changeSection(PPS_CATEGORY_FORM_INDEX);
    else if (
      errors &&
      errors.attachment &&
      formPosition > PPS_ATTACHMENT_FORM_INDEX
    )
      changeSection(PPS_ATTACHMENT_FORM_INDEX);
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
  useEffect(() => {
    if (formPosition > PPS_CATEGORY_FORM_INDEX && !isDirtyCategory())
      changeSection(PPS_CATEGORY_FORM_INDEX);
  }, []);

  async function handleNextClick() {
    if (formPosition === PPS_CATEGORY_FORM_INDEX) {
      const data = await trigger("category");
      if (!data) return;
    }
    if (formPosition === PPS_ATTACHMENT_FORM_INDEX) {
      const data = await trigger("attachment");
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

  function handleCreatedService({
    createService: { message, success },
  }: CreateServiceMutation) {
    if (success) {
      Swal.fire({
        icon: "success",
        title: t("serviceCreated-title"),
        text: t("serviceCreated-text"),
        confirmButtonText: t("serviceCreated-button-label"),
      });

      router.replace(ROUTES.HOMEPAGE);
    } else if (!success) alert(t(`CREATE-SERVICES-${message}-ERROR`));
  }

  /**
   *
   * @param rawPackages All the packages and the rows
   * @returns {formattedPackages[], lowestPrice, maximumPrice}
   */
  function processRawPackages(rawPackages?: IPPIValue) {
    if (!rawPackages || isEmpty(rawPackages)) return;
    let minPrice = Number.MAX_VALUE;
    let maxPrice = Number.MIN_VALUE;

    const packages = [...rawPackages.packages];
    const rows = [...rawPackages.rows];
    if (!packages || !rows) return;
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
          name: row?.name,
          description: row?.description,
          type: row?.inputType,
          value: JSON.stringify(pr?.value),
        };
      });

      newPackage.packageRows = newPrs as any;

      return newPackage;
    });

    return { formatedPackages, minPrice, maxPrice };
  }

  function onSubmit(values: IPostServiceFormValues) {
    const { attachment, category: categorySection, details, pricing } = values;

    const { industry, category, name } = categorySection;
    const industryId = industry.id;
    const categoryId = category.id;
    const {
      faqs: rawFaqs,
      tags: rawTags,
      location: locationRaw,
      description,
    } = details;
    const faqs = rawFaqs?.map((rf) => ({
      question: rf.question,
      answer: rf.answer,
    }));
    const location = locationRaw.name;
    const newTags: ITagInput[] = [];
    const tags: ITagInput[] = rawTags.map(({ isNewRecord, ...tag }) => {
      if (isNewRecord) newTags.push(tag);
      return tag;
    });
    const { price, packages: rawPackages } = pricing;
    const {
      formatedPackages: packages,
      minPrice,
      maxPrice,
    } = processRawPackages(rawPackages) || {};
    // @TODO find out why this happened
    const value: any = {
      name,
      description,
      industryId,
      categoryId,
      location,
      tags,
      faqs,
      newTags,
      companyId: getCompanyId(),
      companyName: getCompanyName() as string,
      createdById: getLoggedInUser()?.id as any,

      ...attachment,
      ...(!!packages && packages?.length > 0
        ? { packages, minPrice, maxPrice }
        : { price }),
    };

    createService({ variables: { input: value } });
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
          <PPSServiceCategoryInput
            errors={errors}
            trigger={trigger}
            control={control}
            register={register}
          />
        )}

        {formPosition === PPS_ATTACHMENT_FORM_INDEX && (
          <PPSServiceAttachmentInput
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

        {formPosition === PPS_REVIEW_FORM_INDEX && (
          <PPSServiceReview
            changeSection={changeSection}
            getValues={getValues}
          />
        )}
      </div>

      <PPSServiceFooterButton
        loading={loading}
        onNextClick={handleNextClick}
        onBackClick={handleBackClick}
        formPosition={formPosition}
      />
    </Form>
  );
};
export default PPSServiceForm;
