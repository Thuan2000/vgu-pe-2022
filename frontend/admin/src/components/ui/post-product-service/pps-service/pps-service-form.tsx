import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { IPostServiceFormValues } from "./pps-service-interface";
import { useRouter } from "next/dist/client/router";
import {
  PPS_INPUT_FORM_INDEX,
  PPS_REVIEW_FORM_INDEX,
} from "./pps-service-constants";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { ppsServiceSchema } from "./pps-service-schema";
import Form from "@components/form";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  CreateServiceMutation,
  UpdateServiceMutation,
} from "@graphql/service.graphql";
import { IService } from "@graphql/types.graphql";
import {
  generateBlobs,
  getCompanyChatId,
  getCompanyId,
  getCompanyName,
  getLoggedInUser,
  getUploadedFiles,
} from "@utils/functions";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { ROUTES } from "@utils/routes";
import { ITagInput } from "@graphql/types.graphql";

import { useUploadFilesMutation } from "@graphql/upload.graphql";
import useIsEditedFormHandler from "src/hooks/useEditedFormHandler";
import {
  generateDefaultValues,
  processRawPackages,
} from "./pps-service-form-functions";
import { useOnScreen } from "src/hooks/useIsOnScreen";
import { scrollToSection } from "@components/ui/record-navigations/post-record-nav-functions";
import SectionNavItem from "@components/ui/record-navigations/section-nav-item";
import SectionWrapper from "@components/ui/record-navigations/section-wrapper";
import PPSServiceAttachmentInput from "./pps-service-attachment-input";
import PPSServiceGeneralInput from "./pps-service-general-input";
import PPSServiceDetailsInput from "./pps-service-details-input";
import PPSServiceFooterButton from "./pps-service-footer-button";
import PPSServicePricingInput from "./pps-service-pricing-input";
import PPSServiceReview from "./pps-service-review";
import PostNavNextBackButton from "@components/ui/record-navigations/post-nav-next-back-button";

export type TVisible = "GENERAL" | "ATTACHMENT" | "DETAILS" | "PRICING";

export type TSectionNav = {
  label: string;
  sectionName: TVisible;
  reference: React.MutableRefObject<null | HTMLDivElement>;
};

interface IPPSServiceFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initValue?: IService;
}

const PPSServiceForm: React.FC<IPPSServiceFormProps> = ({ initValue }) => {
  const { t } = useTranslation("form");
  const { locale, query, ...router } = useRouter();
  const [createService, { loading: creating }] = useCreateServiceMutation({
    onCompleted: handleCreatedService,
  });

  const [uploadFiles, { loading: uploadingFiles }] = useUploadFilesMutation();

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

  const methods = useForm<IPostServiceFormValues>({
    resolver: yupResolver(ppsServiceSchema),
    defaultValues: initValue ? generateDefaultValues(initValue) : {},
  });

  const {
    formState: { errors, dirtyFields },
    trigger,
    handleSubmit,
  } = methods;
  const { startListen, stopListen } = useIsEditedFormHandler();
  useEffect(() => {
    startListen(!!dirtyFields.general);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!dirtyFields.general]);

  // Changing section if there's an error and user submitting
  useEffect(() => {
    if (errors && errors.general && formPosition > PPS_INPUT_FORM_INDEX)
      changeSection(PPS_INPUT_FORM_INDEX);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  function isDirtyGeneral() {
    return !!dirtyFields.general;
  }

  // Redirect to first section if user jump using query
  useEffect(() => {
    if (formPosition > PPS_INPUT_FORM_INDEX && !isDirtyGeneral())
      changeSection(PPS_INPUT_FORM_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function handleNextClick() {
    const generalTrigger = await trigger("general");
    const attachmentTrigger = await trigger("attachment");
    const detailsTrigger = await trigger("details");
    const pricingTrigger = await trigger("pricing");

    if (!generalTrigger) {
      scrollToSection(generalRef);
      return;
    }
    if (!attachmentTrigger) {
      scrollToSection(attachmentRef);
      return;
    }
    if (!detailsTrigger) {
      scrollToSection(detailsRef);
      return;
    }
    if (!pricingTrigger) {
      scrollToSection(pricingRef);
      return;
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

  async function onSubmit(values: IPostServiceFormValues) {
    const { attachment, general, details, pricing } = values;

    const {
      industry,
      category,
      name,
      location: locationRaw,
      description,
    } = general;
    const industryId = industry.id;
    const categoryId = category.id;
    const { faqs: rawFaqs, tags: rawTags } = details;
    const faqs = rawFaqs?.map((rf) => ({
      question: rf.question,
      answer: rf.answer,
    }));
    const location = locationRaw.name;

    const newTags: ITagInput[] = [];
    const tags: string[] = rawTags.map(({ isNewRecord, id, ...tag }: any) => {
      if (isNewRecord) newTags.push(tag);
      return tag.name;
    });

    const {
      images: mixedImages,
      certificates: mixedCertificates,
      videos: mixedVideos,
    } = attachment;

    const oldImages = mixedImages.filter((img) => !img.isNew) || [];
    const images = mixedImages.flatMap((img) => (img.isNew ? img : [])) || [];

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

    const { price, packages: rawPackages } = pricing;
    const packages = rawPackages?.packages;
    const rows = rawPackages?.rows;

    const { formatedPackages, minPrice, maxPrice } =
      processRawPackages(packages, rows) || {};

    const value: any = {
      name,
      description,
      industryId,
      categoryId,
      tags,
      faqs,
      newTags,
      packageRows: rows || null,
      coverImage,
      images: [...oldImages, ...uploadedImages],
      certificates: [...oldCertificates, ...uploadedCertificates],
      videos: [...oldVideos, ...uploadedVideos],
      packages: formatedPackages || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      price: price || null,
      location,
    };
    stopListen();
    if (!!initValue) {
      updateService({ variables: { input: { id: initValue.id, ...value } } });
    } else {
      createService({
        variables: {
          input: {
            ...value,
            companyId: getCompanyId()!,
            companyName: getCompanyName()!,
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

  const generalRef = useRef(null);
  const attachmentRef = useRef(null);
  const detailsRef = useRef(null);
  const pricingRef = useRef(null);

  const sectionNavs: TSectionNav[] = [
    {
      label: "general-nav-label",
      sectionName: "GENERAL",
      reference: generalRef,
    },
    {
      label: "attachments-nav-label",
      sectionName: "ATTACHMENT",
      reference: attachmentRef,
    },
    {
      label: "details-nav-label",
      sectionName: "DETAILS",
      reference: detailsRef,
    },

    {
      label: "pricing-nav-label",
      sectionName: "PRICING",
      reference: pricingRef,
    },
  ];

  // General is default
  const [focusedSection, setFocusedSection] = useState<TVisible>("GENERAL");
  // To know if they are visible
  const isGeneralVisible = useOnScreen(generalRef as any);
  const isAttachmentVisible = useOnScreen(attachmentRef as any, "-300px");
  const isDetailsVisible = useOnScreen(detailsRef as any, "-300px");
  const isPricingVisible = useOnScreen(pricingRef as any, "-300px");

  useEffect(() => {
    let visible: TVisible = "GENERAL";
    if (isAttachmentVisible) visible = "ATTACHMENT";
    if (isDetailsVisible) visible = "DETAILS";
    if (isPricingVisible) visible = "PRICING";

    if (focusedSection !== visible) setFocusedSection(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isGeneralVisible,
    isAttachmentVisible,
    isPricingVisible,
    isDetailsVisible,
  ]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5">
        {formPosition === PPS_REVIEW_FORM_INDEX && (
          <div
            className={`col-span-5 bg-white rounded-md border border-gray-100 p-5 mb-7`}
          >
            <PPSServiceReview changeSection={changeSection} />
            <PostNavNextBackButton
              endPosition={PPS_REVIEW_FORM_INDEX}
              loading={creating || uploadingFiles || updating}
              onNextClick={handleNextClick}
              onBackClick={handleBackClick}
              formPosition={formPosition}
            />
          </div>
        )}

        {formPosition < PPS_REVIEW_FORM_INDEX && (
          <div className={`col-span-4 space-y-3`}>
            <SectionWrapper
              ref={generalRef}
              sectionTitle={t("general-nav-label")}
            >
              <PPSServiceGeneralInput />
            </SectionWrapper>

            <SectionWrapper
              ref={attachmentRef}
              sectionTitle={t("attachment-nav-label")}
            >
              <PPSServiceAttachmentInput />
            </SectionWrapper>

            <SectionWrapper
              ref={detailsRef}
              sectionTitle={t("details-nav-label")}
            >
              <PPSServiceDetailsInput />
            </SectionWrapper>
            <SectionWrapper
              ref={pricingRef}
              sectionTitle={t("pricing-nav-label")}
            >
              <PPSServicePricingInput />
            </SectionWrapper>

            {formPosition === PPS_REVIEW_FORM_INDEX && (
              <PPSServiceReview changeSection={changeSection} />
            )}

            <PostNavNextBackButton
              endPosition={PPS_REVIEW_FORM_INDEX}
              loading={creating || uploadingFiles || updating}
              onNextClick={handleNextClick}
              formPosition={formPosition}
              isStatBottom
            />

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
export default PPSServiceForm;
