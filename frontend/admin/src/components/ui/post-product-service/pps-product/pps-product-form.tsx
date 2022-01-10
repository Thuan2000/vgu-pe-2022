import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import PPSProductCategoryInput from "./pps-product-category-input";
import { useRouter } from "next/dist/client/router";
import {
  PPS_PRODUCT_CATEGORY_FORM_INDEX,
  PPS_PRODUCT_REVIEW_FORM_INDEX,
  PPS_PRODUCT_DETAILS_FORM_INDEX,
  PPS_PRODUCT_PRICING_FORM_INDEX,
  PPS_PRODUCT_GENERAL_FORM_INDEX,
} from "./pps-product-constants";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ppsProductSchema } from "./pps-product-schema";
import PPSProductGeneralInput from "./pps-product-general-input";
import Form from "@components/form";
import PPSProductFooterButton from "./pps-product-footer-button";
import PPSServicePricingInput from "./pps-product-pricing-input";
import PPSProductReview from "./pps-product-review";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { ROUTES } from "@utils/routes";

import { IPostProductFormValues } from "./pps-product-interface";
import PPSProductDetailsInput from "./pps-product-details-input";
import {
  ICreateProductInput,
  ITagInput,
  IVariationInput,
} from "@graphql/types.graphql";
import { useCreateProductMutation } from "@graphql/product.graphql";
import { getCompanyId, getCompanyName } from "@utils/functions";

interface IPPSProductFormProps {
  initValues?: any;
}

const PPSProductForm: React.FC<IPPSProductFormProps> = ({ initValues }) => {
  const { t } = useTranslation("form");
  const { locale, query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;
  const methods = useForm<IPostProductFormValues>({
    resolver: yupResolver(ppsProductSchema),
  });
  const {
    control,
    register,
    formState: { errors, dirtyFields },
    trigger,
    getValues,
    setError,
    handleSubmit,
  } = methods;

  const [createProduct, { loading: creating }] = useCreateProductMutation();

  function changeSection(newPosition: number) {
    const { pathname } = router;
    router.replace({
      pathname,
      query: { ...query, formPosition: newPosition },
    });
  }

  // Changing section if there's an error and user submitting
  useEffect(() => {
    if (
      errors &&
      errors.category &&
      formPosition > PPS_PRODUCT_CATEGORY_FORM_INDEX
    )
      changeSection(PPS_PRODUCT_CATEGORY_FORM_INDEX);
    else if (
      errors &&
      errors.details &&
      formPosition > PPS_PRODUCT_DETAILS_FORM_INDEX
    )
      changeSection(PPS_PRODUCT_DETAILS_FORM_INDEX);
    else if (
      errors &&
      errors.pricing &&
      formPosition > PPS_PRODUCT_PRICING_FORM_INDEX
    )
      changeSection(PPS_PRODUCT_PRICING_FORM_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  // Redirect to first section if user jump using query
  useEffect(() => {
    if (formPosition > PPS_PRODUCT_CATEGORY_FORM_INDEX && !dirtyFields.category)
      changeSection(PPS_PRODUCT_CATEGORY_FORM_INDEX);
  }, []);

  async function handleNextClick() {
    if (formPosition === PPS_PRODUCT_CATEGORY_FORM_INDEX) {
      const data = await trigger("category");
      if (!data) return;
    }
    if (formPosition === PPS_PRODUCT_GENERAL_FORM_INDEX) {
      const data = await trigger("general");
      if (!data) return;
    }
    if (formPosition === PPS_PRODUCT_PRICING_FORM_INDEX) {
      // const isValid =
      //   !!getValues("pricing.variants") || !!getValues("pricing.price");
      const data =
        (await trigger("pricing.price")) ||
        (await trigger("pricing.variations"));
      if (!data) {
        setError("pricing", { message: "pricing-not-setted-error" });
        return;
      }
    }
    if (formPosition === PPS_PRODUCT_DETAILS_FORM_INDEX) {
      const data = await trigger("details");
      if (!data) return;
    }
    if (formPosition >= PPS_PRODUCT_REVIEW_FORM_INDEX) return;

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

  function getMinMaxPrice(variations: IVariationInput[] = []) {
    const pricing = {
      minPrice: Number.MAX_VALUE,
      maxPrice: Number.MIN_VALUE,
    };

    variations.forEach(({ price }) => {
      if (price < pricing.minPrice) pricing.minPrice = price;
      else if (price > pricing.maxPrice) pricing.maxPrice = price;
    });

    return pricing;
  }

  function onSubmit(values: IPostProductFormValues) {
    const { category: categoryForm, general, details, pricing } = values;

    const { name, industry, category } = categoryForm;
    const { images, certificates, minOrder, description, videos } = general;
    const { price, variations: rawVariations } = pricing;
    const {
      tags: rawTags,
      brandName,
      baseDimension,
      location,
      isCustom,
      isPreorder,
      packagedDimension,
      status: rawStatus,
      warranty,
    } = details;

    const status = rawStatus.value;

    const variations: IVariationInput[] = rawVariations?.map(
      ({ id, ...rest }) => rest
    );

    const coverImage = images?.[0];

    const newTags: ITagInput[] = [];
    const tags: string[] = rawTags.map(({ isNewRecord, id, ...tag }: any) => {
      if (isNewRecord) newTags.push(tag);
      return tag.name;
    });

    const minMaxPrice = getMinMaxPrice(variations);

    const inputValues: ICreateProductInput | any = {
      // From category tab
      name,
      industryId: industry.id,
      categoryId: category.id,

      // From General tab
      coverImage,
      certificates,
      minOrder,
      description,
      videos,
      warehouseLocation: location.name,

      // From Pricing tab
      price,
      variations,
      ...(!!variations?.length ? { minMaxPrice } : {}),

      // From Details tab
      brandName,
      tags,
      newTags,
      baseDimension,
      isCustom,
      isPreorder,
      packagedDimension,
      status,

      gallery: images,
    };

    if (initValues) {
    } else {
      createProduct({
        variables: {
          input: {
            companyId: getCompanyId(),
            companyName: getCompanyName(),
            ...inputValues,
          },
        },
      });
    }
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-2 space-y-2">
        <div
          className={
            formPosition === PPS_PRODUCT_REVIEW_FORM_INDEX
              ? "sm:w-full"
              : "sm:w-2/3"
          }
        >
          {formPosition === PPS_PRODUCT_CATEGORY_FORM_INDEX && (
            <PPSProductCategoryInput
              errors={errors}
              trigger={trigger}
              control={control}
              register={register}
            />
          )}
          {formPosition === PPS_PRODUCT_GENERAL_FORM_INDEX && (
            <PPSProductGeneralInput
              errors={errors}
              trigger={trigger}
              control={control}
              register={register}
            />
          )}
          {formPosition === PPS_PRODUCT_PRICING_FORM_INDEX && (
            <PPSServicePricingInput
              errors={errors}
              trigger={trigger}
              control={control}
              register={register}
            />
          )}
          {formPosition === PPS_PRODUCT_DETAILS_FORM_INDEX && (
            <PPSProductDetailsInput />
          )}
          {formPosition === PPS_PRODUCT_REVIEW_FORM_INDEX && (
            <PPSProductReview
              changeSection={changeSection}
              getValues={getValues}
            />
          )}
        </div>
        <PPSProductFooterButton
          loading={creating}
          onNextClick={handleNextClick}
          onBackClick={handleBackClick}
          formPosition={formPosition}
        />
      </Form>
    </FormProvider>
  );
};
export default PPSProductForm;
