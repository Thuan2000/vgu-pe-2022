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

import {
  IPostProductFormValues,
  IProductStatus,
} from "./pps-product-interface";
import PPSProductDetailsInput from "./pps-product-details-input";
import {
  ICreateProductInput,
  IProduct,
  ITagInput,
  IVariation,
  IVariationInput,
  IVariationOption,
} from "@graphql/types.graphql";
import {
  CreateProductMutation,
  UpdateProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@graphql/product.graphql";
import {
  generateUUID,
  getCompanyId,
  getCompanyName,
  isEmptyObject,
  removeTypename,
  removeTypenameFromArray,
} from "@utils/functions";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { getLocationByName, vietnamProvinces } from "@utils/vietnam-cities";
import { groupBy } from "lodash";
import { IGroupFormValues } from "./product-group-form";

interface IPPSProductFormProps {
  initValues?: IProduct;
}

function getStatus(value: string) {
  if (!value) return null;

  const status: IProductStatus = {
    id: generateUUID(),
    value,
  };

  return status;
}

function getDefaultGroups(variations: IVariation[]) {
  if (!variations?.length) return;

  const rawGroups: IVariationOption[] = [];

  variations.forEach((v) => {
    const removedTypenameOptions = removeTypenameFromArray(v?.options!);
    rawGroups.push(...removedTypenameOptions);
  });

  const objClassifications = groupBy(rawGroups, (r) => r.name);

  const groups: IGroupFormValues[] = Object.keys(objClassifications).map(
    (key) => {
      const classifications = objClassifications?.[key].map((c) => ({
        id: generateUUID(),
        name: c.value,
      }));

      const group: IGroupFormValues = {
        id: generateUUID(),
        name: key,
        classifications,
      };

      return group;
    }
  );
  return groups;
}

function getDefaultVariations(variations: IVariation[]) {
  const variants = variations.map(({ price, title, image, options }) => ({
    id: generateUUID(),
    price,
    title,
    image,
    options: removeTypenameFromArray(options!),
  }));

  return variants;
}

function generateDefaultValues(initValues: IProduct) {
  if (isEmptyObject(initValues)) return;

  const defaultInput: IPostProductFormValues = {
    category: {
      name: initValues.name,
      category: getCategory(initValues.categoryId),
      industry: getIndustry(initValues.industryId),
    },
    general: {
      description: initValues.description,
      images: removeTypenameFromArray(initValues.gallery || []),
      videos: removeTypenameFromArray(initValues.videos || []),
      certificates: removeTypenameFromArray(initValues.certificates || []),
      minOrder: initValues.minOrder,
    },
    pricing: {
      price: initValues.price,
      ...(!!initValues.variations
        ? {
            groups: getDefaultGroups(initValues.variations),
            variations: getDefaultVariations(initValues.variations),
          }
        : {}),
    } as any,
    details: {
      brandName: initValues.brandName,
      baseDimension: removeTypename(initValues.baseDimension || {}),
      packagedDimension: removeTypename(initValues.packagedDimension || {}),
      tags: removeTypenameFromArray(initValues.tags),
      isPreorder: initValues.isPreorder || false,
      isCustom: initValues.isCustom || false,
      location: getLocationByName(initValues.warehouseLocation),
      ...(!!initValues.status ? { status: getStatus(initValues.status) } : {}),
    } as any,
  };
  return defaultInput;
}

const PPSProductForm: React.FC<IPPSProductFormProps> = ({ initValues }) => {
  const { t } = useTranslation("form");
  const { locale, query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;
  const methods = useForm<IPostProductFormValues>({
    reValidateMode: "onSubmit",
    resolver: yupResolver(ppsProductSchema),
    defaultValues: generateDefaultValues(initValues || ({} as any)),
  });
  const {
    control,
    register,
    formState: { errors, dirtyFields },
    trigger,
    handleSubmit,
  } = methods;

  const [updateProduct, { loading: updating }] = useUpdateProductMutation({
    onCompleted: handleCompleteUpdated,
  });
  const [createProduct, { loading: creating }] = useCreateProductMutation({
    onCompleted: handleCompleteCreated,
  });

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

  function handleCompleteCreated({
    createProduct: { message, success },
  }: CreateProductMutation) {
    fireSuccessErrorMessage(success, message);
  }

  function handleCompleteUpdated({
    updateProduct: { message, success },
  }: UpdateProductMutation) {
    fireSuccessErrorMessage(success, message);
  }

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
      const data = await trigger("pricing");
      if (!data) return;
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

      router.replace(`${ROUTES.POSTED_PRODUCT_SERVICE}?target=product`);
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

    const status = rawStatus?.value;

    const variations: IVariationInput[] = rawVariations?.map(
      ({ id, ...rest }) => rest
    );

    const coverImage = images?.[0];

    const newTags: ITagInput[] = [];
    const tags: string[] = rawTags?.map(({ isNewRecord, id, ...tag }: any) => {
      if (isNewRecord) newTags?.push(tag);
      return tag.name;
    });

    const minMaxPrice = getMinMaxPrice(variations);

    const inputValues: ICreateProductInput | any = {
      // From category tab
      name,
      industryId: industry?.id,
      categoryId: category?.id,

      // From General tab
      coverImage,
      certificates,
      minOrder,
      description,
      videos,
      warehouseLocation: location?.name,

      // From Pricing tab
      ...(!!price ? { price } : {}),
      ...(!!variations?.length ? { variations, ...minMaxPrice } : {}),

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
      updateProduct({
        variables: {
          id: initValues.id,
          input: inputValues,
          ...(!!initValues.price && !!variations?.length
            ? { price: null }
            : {}),
        },
      });
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
            <PPSProductGeneralInput />
          )}
          {formPosition === PPS_PRODUCT_PRICING_FORM_INDEX && (
            <PPSServicePricingInput />
          )}
          {formPosition === PPS_PRODUCT_DETAILS_FORM_INDEX && (
            <PPSProductDetailsInput />
          )}
          {formPosition === PPS_PRODUCT_REVIEW_FORM_INDEX && (
            <PPSProductReview changeSection={changeSection} />
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
