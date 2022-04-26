import SectionNavItem from "../../record-navigations/section-nav-item";
import React, { MutableRefObject, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/dist/client/router";
import {
  PPS_PRODUCT_INPUT_FORM_INDEX,
  PPS_PRODUCT_REVIEW_FORM_INDEX,
} from "./pps-product-constants";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ppsProductSchema } from "./pps-product-schema";
import PPSProductGeneralInput from "./pps-product-general-input";
import Form from "@components/form";
import PPSProductFooterButton from "./pps-product-footer-button";
import PPSProductPricingInput from "./pps-product-pricing-input";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { ROUTES } from "@utils/routes";

import { IPostProductFormValues } from "./pps-product-interface";
import PPSProductDetailsInput from "./pps-product-details-input";
import {
  ICreateProductInput,
  IProduct,
  ITagInput,
  IVariationInput,
} from "@graphql/types.graphql";

import {
  CreateProductMutation,
  UpdateProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@graphql/product.graphql";
import {
  generateBlobs,
  getCompanyChatId,
  getCompanyId,
  getCompanyName,
  getLoggedInUser,
  getUploadedFiles,
} from "@utils/functions";
import { isEmpty } from "lodash";
import { useUploadFilesMutation } from "@graphql/upload.graphql";
import useIsEditedFormHandler from "src/hooks/useEditedFormHandler";
import { useModal } from "src/contexts/modal.context";
import { useRef } from "react";

import { useOnScreen } from "src/hooks/useIsOnScreen";
import {
  generateDefaultValues,
  getMinMaxPrice,
} from "./pps-product-form-functions";
import PPSProductReview from "./pps-product-review";
import { scrollToSection } from "@components/ui/record-navigations/post-record-nav-functions";
import PostNavNextBackButton from "@components/ui/record-navigations/post-nav-next-back-button";

interface IPPSProductFormProps {
  initValues?: IProduct;
}

type TVisible = "GENERAL" | "PRICING" | "DETAILS";

type TSectionNav = {
  label: string;
  sectionName: TVisible;
  reference: React.MutableRefObject<null | HTMLDivElement>;
};

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
    formState: { dirtyFields },
    trigger,
    handleSubmit,
  } = methods;

  const { startListen, stopListen } = useIsEditedFormHandler();
  useEffect(() => {
    startListen(!isEmpty(dirtyFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields]);

  useEffect(() => {
    if (!dirtyFields.general) changeSection(PPS_PRODUCT_INPUT_FORM_INDEX);
  }, []);

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

  function handleCompleteCreated({
    createProduct: { message, success },
  }: CreateProductMutation) {
    fireRespMessage(success, message);
  }

  function handleCompleteUpdated({
    updateProduct: { message, success },
  }: UpdateProductMutation) {
    fireRespMessage(success, message);
  }

  async function handleNextClick() {
    const dataGeneral = await trigger("general");
    if (!dataGeneral) {
      return scrollToSection(general);
    }
    const dataPricing = await trigger("pricing");
    if (!dataPricing) {
      return scrollToSection(pricing);
    }
    const dataDetails = await trigger("details");
    if (!dataDetails) {
      return scrollToSection(details);
    }

    if (formPosition < PPS_PRODUCT_REVIEW_FORM_INDEX)
      changeSection(formPosition + 1);
  }

  function fireRespMessage(success: boolean, message: string) {
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

  async function onSubmit(values: IPostProductFormValues) {
    const { general, details, pricing } = values;

    const {
      name,
      industry,
      category,
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

  // To know if they are visible
  const isGeneralVisible = useOnScreen(general as any);
  const isDetailsVisible = useOnScreen(details as any, "-300px");
  const isPricingVisible = useOnScreen(pricing as any, "-300px");

  // General is default
  const [focusedSection, setFocusedSection] = useState<TVisible>("GENERAL");

  useEffect(() => {
    let visible: TVisible = "GENERAL";
    if (isPricingVisible) visible = "PRICING";
    if (isDetailsVisible) visible = "DETAILS";

    if (focusedSection !== visible) setFocusedSection(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGeneralVisible, isPricingVisible, isDetailsVisible]);

  const sectionNavs: TSectionNav[] = [
    {
      label: "general-nav-label",
      sectionName: "GENERAL",
      reference: general,
    },
    {
      label: "details-nav-label",
      sectionName: "DETAILS",
      reference: details,
    },
    {
      label: "pricing-nav-label",
      sectionName: "PRICING",
      reference: pricing,
    },
  ];
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className="">
        {formPosition === PPS_PRODUCT_REVIEW_FORM_INDEX && (
          <div
            className={`bg-white rounded-md border border-gray-100 p-5 mb-7`}
          >
            <PPSProductReview changeSection={changeSection} />
            <PostNavNextBackButton
              endPosition={PPS_PRODUCT_REVIEW_FORM_INDEX}
              loading={creating || uploadingFiles || updating}
              onNextClick={handleNextClick}
              formPosition={formPosition}
              onBackClick={handleBackClick}
            />
          </div>
        )}
        {formPosition < PPS_PRODUCT_REVIEW_FORM_INDEX && (
          <div className="relative grid grid-cols-5">
            <div className="col-span-4 relative space-y-4">
              <PPSProductGeneralInput ref={general} />
              <PPSProductDetailsInput ref={details} />
              <PPSProductPricingInput ref={pricing} />

              <PostNavNextBackButton
                endPosition={PPS_PRODUCT_REVIEW_FORM_INDEX}
                loading={creating || uploadingFiles || updating}
                onNextClick={handleNextClick}
                formPosition={formPosition}
                isStatBottom
              />
            </div>

            <ul className="col-span-1 fixed right-[5%] truncate top-24 ml-5">
              {sectionNavs.map((sn) => {
                const onClick = () => scrollToSection(sn.reference);
                const isActive = focusedSection === sn.sectionName;
                return (
                  <SectionNavItem
                    isActive={isActive}
                    label={t(sn.label)}
                    onClick={onClick}
                    key={sn.label + "sn-post-product"}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </Form>
    </FormProvider>
  );
};
export default PPSProductForm;
