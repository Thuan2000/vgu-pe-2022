import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useTranslation } from "react-i18next";

import Form from "@components/form";
import GeneralForm from "./general-form";
import Button from "@components/ui/storybook/button";
import { useRouter } from "next/dist/client/router";
import DetailsInput from "./details-input";
import { PostRequestSchema, PostRequestFormValue } from "./post-request-schema";

import {
  PR_INPUT_FORM_INDEX,
  PR_CHECK_FORM_INDEX,
} from "./post-tender-constants";
import CheckSection from "./check-section";
import {
  useCreateBuyingRequestMutation,
  useUpdateBuyingRequestMutation,
} from "@graphql/buying-request.graphql";
import { ROUTES } from "@utils/routes";
import { IBuyingRequest, IResponse } from "@graphql/types.graphql";
import {
  generateBlobs,
  getBlob,
  getCompanyChatId,
  getCompanyId,
  getCompanyName,
  getLoggedInUser,
  removeTypenameFromArray,
} from "@utils/functions";
import { getDefaultValue } from "./ptf-utils";
import { useUploadFilesMutation } from "@graphql/upload.graphql";
import useIsEditedFormHandler from "src/hooks/useEditedFormHandler";
import {
  changeSection,
  scrollToSection,
} from "@components/ui/record-navigations/post-record-nav-functions";
import SectionWrapper from "@components/ui/record-navigations/section-wrapper";
import PPSProductFooterButton from "@components/ui/post-product-service/pps-product/pps-product-footer-button";
import PostNavNextBackButton from "@components/ui/record-navigations/post-nav-next-back-button";
import SectionNavItem from "@components/ui/record-navigations/section-nav-item";
import { useOnScreen } from "src/hooks/useIsOnScreen";

type TVisible = "GENERAL" | "DETAILS";

type TSectionNav = {
  label: string;
  sectionName: TVisible;
  reference: React.MutableRefObject<null | HTMLDivElement>;
};

interface IPostTenderFormParams {
  initValue?: IBuyingRequest;
}

const PostTenderForm: React.FC<IPostTenderFormParams> = ({ initValue }) => {
  const methods = useForm<PostRequestFormValue>({
    resolver: yupResolver(PostRequestSchema),
    defaultValues: getDefaultValue(initValue) as any,
  });

  const {
    formState: { dirtyFields },
    getValues,
    handleSubmit,
    trigger,
  } = methods;

  const { startListen, stopListen } = useIsEditedFormHandler();
  useEffect(() => {
    startListen(!!dirtyFields.general);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields.general]);

  const { query, ...router } = useRouter();
  const formPosition = parseInt(query.formPosition as string) || 1;
  const { t } = useTranslation("form");
  const [createBuyingRequest, { loading: creating }] =
    useCreateBuyingRequestMutation({
      onCompleted: ({ createBuyingRequest }) =>
        handleCreateUpdateMutationComplete(createBuyingRequest),
    });
  const [uploadFiles, { loading: uploadingFiles }] = useUploadFilesMutation();
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

  // Change section when user come to formSection=2 directly not from 1
  useEffect(() => {
    if (formPosition > PR_INPUT_FORM_INDEX && !dirtyFields.general)
      changeSection(PR_INPUT_FORM_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUploadedFiles(blobs: Blob[]) {
    const { data } = await uploadFiles({
      variables: {
        input: {
          files: blobs,
          uploadsFileInputType: "image" as any, // IFileType,
          companyName: getCompanyName()!,
          fileAccessControl: "PUBLIC_READ" as any, // IFileAccessControl ,
        },
      },
    });

    const uploadedImages = removeTypenameFromArray(data?.uploadFiles);

    return uploadedImages;
  }

  async function onSubmit(inputValues: PostRequestFormValue) {
    const { general, details } = inputValues;

    // All of this variable need tobe processed
    const {
      industry,
      category,
      gallery: mixedGallery,
      ...generalRest
    } = general;
    const { allowedCompany, endDate, sourceType, location, ...detailsRest } =
      details;

    const locationName = location.name;
    const industryId = parseInt(industry.id + "");
    const categoryId = parseInt(category.id + "");

    const oldGallery = mixedGallery?.filter((img) => !img.isNew) || [];
    const gallery =
      mixedGallery?.flatMap((img) => (img.isNew ? img : [])) ?? [];

    // Br Images
    const blobGallery = await generateBlobs(gallery);
    const uploadedImages = await getUploadedFiles(blobGallery);

    const coverImage = oldGallery?.[0] || uploadedImages?.[0];

    const userId = getLoggedInUser()?.id;
    const values: any = {
      [initValue ? "updatedById" : "createdById"]: getLoggedInUser()?.id,
      location: locationName,
      industryId,
      categoryId,
      sourceTypeId: sourceType?.id,
      coverImage,
      gallery: [...oldGallery, ...uploadedImages],
      ...(!!initValue ? { updatedById: userId! } : { createdById: userId! }),
      ...allowedCompany,
      ...generalRest,
      ...detailsRest,
      endDate: new Date(endDate).getTime(),
    };
    stopListen();

    if (!!initValue) {
      // Old gallery is the posted gallery files
      await updateBr({
        variables: {
          id: parseInt(initValue.id),
          newValue: values,
        },
      });
    } else
      await createBuyingRequest({
        variables: {
          input: {
            ...values,
            companyId: getCompanyId()!,
            companyName: getCompanyName()!,
            chatId: getCompanyChatId()!,
          },
        },
      });
  }

  async function handleNextClick() {
    const general = await trigger("general");
    const details = await trigger("details");

    if (!general) scrollToSection(generalRef);
    else if (!details) scrollToSection(detailsRef);
    else if (formPosition < PR_CHECK_FORM_INDEX)
      changeSection(formPosition + 1);
  }

  const generalRef = useRef(null);
  const detailsRef = useRef(null);

  const isGeneralVisible = useOnScreen(generalRef as any);
  const isDetailsVisible = useOnScreen(detailsRef as any, "-300px");

  // General is default
  const [focusedSection, setFocusedSection] = useState<TVisible>("GENERAL");

  useEffect(() => {
    let visible: TVisible = "GENERAL";
    if (isGeneralVisible) visible = "GENERAL";
    if (isDetailsVisible) visible = "DETAILS";

    if (focusedSection !== visible) setFocusedSection(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGeneralVisible, isDetailsVisible]);

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  const sectionNavs: TSectionNav[] = [
    {
      label: "general-nav-label",
      sectionName: "GENERAL",
      reference: generalRef,
    },
    {
      label: "details-nav-label",
      sectionName: "DETAILS",
      reference: detailsRef,
    },
  ];

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formPosition === PR_CHECK_FORM_INDEX && (
          <div
            className={`bg-white rounded-md border border-gray-100 p-5 mb-7`}
          >
            <CheckSection getValues={getValues} changeSection={changeSection} />

            <PostNavNextBackButton
              endPosition={PR_CHECK_FORM_INDEX}
              loading={creating || uploadingFiles || updating}
              onNextClick={handleNextClick}
              onBackClick={handleBackClick}
              formPosition={formPosition}
            />
          </div>
        )}

        {formPosition < PR_CHECK_FORM_INDEX && (
          <div className="relative grid grid-cols-5">
            <div className="col-span-4 space-y-4">
              <SectionWrapper
                ref={generalRef}
                sectionTitle={t("general-nav-label")}
              >
                <GeneralForm />
              </SectionWrapper>
              <SectionWrapper
                ref={detailsRef}
                sectionTitle={t("details-nav-label")}
              >
                <DetailsInput />
              </SectionWrapper>

              <PostNavNextBackButton
                endPosition={PR_CHECK_FORM_INDEX}
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
          </div>
        )}
      </Form>
    </FormProvider>
  );
};
export default PostTenderForm;
