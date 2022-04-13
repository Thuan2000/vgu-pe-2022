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
  generateBlobs,
  generateUUID,
  getCompanyChatId,
  getCompanyId,
  getCompanyName,
  getLoggedInUser,
  getUploadedFiles,
  isEmptyObject,
  removeTypename,
  removeTypenameFromArray,
} from "@utils/functions";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { getLocationByName, vietnamProvinces } from "@utils/vietnam-cities";
import { groupBy } from "lodash";
import { IGroupFormValues } from "./product-group-form";
import { useUploadFilesMutation } from "@graphql/upload.graphql";
import useIsEditedFormHandler from "src/hooks/useEditedFormHandler";
import { useModal } from "src/contexts/modal.context";
import Typography from "@components/ui/storybook/typography";
import { useRef } from "react";

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
  const { openModal, closeModal } = useModal();

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

  const { startListen, stopListen } = useIsEditedFormHandler();
  useEffect(() => {
    startListen(!!dirtyFields.category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!dirtyFields.category]);

  const [uploadFiles, { loading: uploadingFiles }] = useUploadFilesMutation();

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

  function openModalCategory() {
    changeSection(PPS_PRODUCT_GENERAL_FORM_INDEX);
    openModal(
      (
        <PPSProductCategoryInput
          errors={errors}
          trigger={trigger}
          control={control}
          register={register}
        />
      ) as any
    );
  }

  useEffect(() => {
    openModalCategory();
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const dataCategory = await trigger("category");
    if (!dataCategory) {
      return openModalCategory();
    }
    const dataGeneral = await trigger("general");
    if (!dataGeneral) {
      return scrollToSection(general, 2);
    }
    const dataPricing = await trigger("pricing");
    console.log(dataPricing);

    if (!dataPricing) {
      return scrollToSection(pricing, 2);
    }
    const dataDetails = await trigger("details");
    if (!dataDetails) {
      return scrollToSection(details, 2);
    }
    // if (formPosition === PPS_PRODUCT_CATEGORY_FORM_INDEX) {
    // }
    // if (formPosition === PPS_PRODUCT_GENERAL_FORM_INDEX) {
    // }
    // if (formPosition === PPS_PRODUCT_PRICING_FORM_INDEX) {

    // }
    // if (formPosition === PPS_PRODUCT_DETAILS_FORM_INDEX) {

    // }
    if (formPosition >= PPS_PRODUCT_REVIEW_FORM_INDEX) return;

    // changeSection(formPosition + 1);
  }

  function fireSuccessErrorMessage(success: boolean, message: string) {
    if (success) {
      Swal.fire({
        icon: "success",
        title: t("productCreated-title"),
        text: t("productCreated-text"),
        confirmButtonText: t("productCreated-button-label"),
      });

      router.replace(`${ROUTES.POSTED_PRODUCT_SERVICE}?target=product`);
    } else if (!success) alert(t(`CREATE-PRODUCT-${message}-ERROR`));
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

  async function onSubmit(values: IPostProductFormValues) {
    const { category: categoryForm, general, details, pricing } = values;

    const { name, industry, category } = categoryForm;
    const {
      images: mixedImages,
      certificates: mixedCertificates,
      minOrder,
      description,
      videos: mixedVideos,
    } = general;
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

    const oldImages = mixedImages.filter((img) => !img.isNew) || [];
    const images = mixedImages.filter((img) => img.isNew) || [];

    const oldVideos = mixedVideos?.filter((vid) => !vid.isNew) || [];
    const videos = mixedVideos?.flatMap((vid) => (vid.isNew ? vid : [])) || [];

    const oldCertificates =
      mixedCertificates?.filter((cer) => !cer.isNew) || [];
    const certificates =
      mixedCertificates?.flatMap((cer) => (cer.isNew ? cer : [])) || [];

    const blobImages = await generateBlobs(images);
    const blobCertificates = await generateBlobs(certificates);
    const blobVideos = await generateBlobs(videos);

    const uploadedImages = await getUploadedFiles(uploadFiles, blobImages);
    const uploadedCertificates = await getUploadedFiles(
      uploadFiles,
      blobCertificates
    );
    const uploadedVideos = await getUploadedFiles(uploadFiles, blobVideos);

    const coverImage = oldImages?.[0] || uploadedImages?.[0];

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
      certificates: [...oldCertificates, ...uploadedCertificates],
      minOrder,
      description,
      videos: [...oldVideos, ...uploadedVideos],
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
      gallery: [...oldImages, ...uploadedImages],
    };
    stopListen();
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
            ...inputValues,
            companyId: getCompanyId(),
            companyName: getCompanyName(),
            chatId: getCompanyChatId()!,
            createdById: getLoggedInUser()?.id!,
          },
        },
      });
    }
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  const general = useRef(null);
  const pricing = useRef(null);
  const details = useRef(null);

  const scrollToSection = (
    elementRef: React.RefObject<HTMLDivElement>,
    idx: number
  ) => {
    // changeSection(idx);
    window.scrollTo({
      top: elementRef.current?.offsetTop,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   const ref = useRef<HTMLDivElement>(null);
  //   const offsetTop = ref.current?.offsetTop;
  //   console.log(offsetTop);
  // });

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-2 space-y-2">
        <div className="product-edit__container">
          <div className="product-edit__main">
            {/* {formPosition === PPS_PRODUCT_CATEGORY_FORM_INDEX && (
            <PPSProductCategoryInput
              errors={errors}
              trigger={trigger}
              control={control}
              register={register}
            />
          )} */}
            <section
              ref={general}
              className="bg-white shadow-md md:rounded-sm translate-y-[-2px] mb-5 mt-px-15 px-10 py-6 min-w-[65vh]"
            >
              <Typography
                text={t("general-nav-label")}
                variant="smallTitle"
                size="lg"
                className="mb-5"
              />
              <PPSProductGeneralInput />
              <div></div>
            </section>
            <section
              ref={pricing}
              className="bg-white shadow-md md:rounded-sm translate-y-[-2px] mb-5 mt-px-15 px-10 py-6"
            >
              <Typography
                text={t("pricing-nav-label")}
                variant="smallTitle"
                size="lg"
                className="mb-5"
              />
              <PPSServicePricingInput />
            </section>
            <section
              ref={details}
              className="bg-white shadow-md md:rounded-sm translate-y-[-2px] mb-5 mt-px-15 px-10 py-6"
            >
              <Typography
                text={t("details-nav-label")}
                variant="smallTitle"
                size="lg"
                className="mb-5"
              />
              <PPSProductDetailsInput />
            </section>
            <section className="bg-white shadow-md md:rounded-sm translate-y-[-2px] mb-5 mt-px-15 px-10 py-6">
              <PPSProductReview changeSection={changeSection} />
            </section>

            {/* {formPosition === PPS_PRODUCT_GENERAL_FORM_INDEX && (
          )}
          {formPosition === PPS_PRODUCT_PRICING_FORM_INDEX && (
          )}
          {formPosition === PPS_PRODUCT_DETAILS_FORM_INDEX && (
          )} */}
            {/* {formPosition === PPS_PRODUCT_REVIEW_FORM_INDEX && (
          )} */}
          </div>
          <div className="product-selected-fix" z-index="999">
            <div className="fix-container fixed-bottom">
              <div className="container">
                <PPSProductFooterButton
                  loading={creating || uploadingFiles || updating}
                  onNextClick={handleNextClick}
                  onBackClick={handleBackClick}
                  formPosition={formPosition}
                />
              </div>
            </div>
          </div>
          <div className="product-edit__side">
            <ul className="flex justify-between flex-col side-nav-list">
              <li
                className={`side-nav-item ${
                  formPosition === PPS_PRODUCT_GENERAL_FORM_INDEX
                    ? "active"
                    : " "
                }`}
              >
                <a
                  onClick={() => scrollToSection(general, 2)}
                  href="javascript:void(0)"
                >
                  {t("general-nav-label")}
                </a>
              </li>
              <li
                className={`side-nav-item ${
                  formPosition === PPS_PRODUCT_PRICING_FORM_INDEX
                    ? "active"
                    : " "
                }`}
              >
                <a
                  onClick={() => scrollToSection(pricing, 3)}
                  href="javascript:void(0)"
                >
                  {t("pricing-nav-label")}
                </a>
              </li>
              <li
                className={`side-nav-item ${
                  formPosition === PPS_PRODUCT_DETAILS_FORM_INDEX
                    ? "active"
                    : " "
                }`}
              >
                <a
                  onClick={() => scrollToSection(details, 4)}
                  href="javascript:void(0)"
                >
                  {t("details-nav-label")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
};
export default PPSProductForm;
