import Form from "@components/form";
import { getBusinessTypes } from "@datas/businessTypes";
import { getIndustry } from "@datas/industries";
import {
  UpdateCompanyDetailMutation,
  useUpdateCompanyDetailMutation,
} from "@graphql/company.graphql";
import { ICompany, IUpdateCompanyDetailsInput } from "@graphql/types.graphql";
import { useUploadFilesMutation } from "@graphql/upload.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { setIsFullInfoTrue } from "@utils/auth-utils";
import {
  generateBlobs,
  generateUUID,
  getCompanyId,
  getUploadedFiles,
  removeTypename,
  removeTypenameOfChildrens,
} from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { getLocationByName } from "@utils/vietnam-cities";
import { isEmpty, method } from "lodash";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useWSChat } from "src/contexts/ws-chat.context";
import useIsEditedFormHandler from "src/hooks/useEditedFormHandler";
import { useOnScreen } from "src/hooks/useIsOnScreen";
import Swal from "sweetalert2";
import PostNavNextBackButton from "../record-navigations/post-nav-next-back-button";
import { scrollToSection } from "../record-navigations/post-record-nav-functions";
import SectionNavItem from "../record-navigations/section-nav-item";
import SectionWrapper from "../record-navigations/section-wrapper";
import Button from "../storybook/button";
import { IRawBFW } from "./ec-add-branch/bfw-constants";
import ECAdditionalInput from "./ec-additional-input";
import { EC_INPUT_FORM_INDEX, EC_REVIEW_FORM_INDEX } from "./ec-constants";
import ECDetailsInput from "./ec-details-input";
import { getBfws, turnLocationToString } from "./ec-functions";
import ECGeneralInput from "./ec-general-input";
import { ECFormResolver } from "./ec-resolver";
import { ECFormValues } from "./ec-schema";

type TVisible = "GENERAL" | "DETAILS" | "ADDITIONAL";

type TSectionNav = {
  label: string;
  sectionName: TVisible;
  reference: React.MutableRefObject<null | HTMLDivElement>;
};

interface ICompanyDetailsFormProps {
  initValue: ICompany;
}

function returnObjectIfExist(isExist: boolean, key: string, value: any) {
  if (isExist) return { [key]: value };
  return {};
}

function generateMainProducts(mainProducts: string[]) {
  return mainProducts.map((mp) => ({ label: mp, id: generateUUID() }));
}

// TODO: update code to be more beautifull
function getDefaultValue(initValue: ICompany) {
  const { settings } = initValue || {};

  const data: ECFormValues = {
    general: {
      ...returnObjectIfExist(!!initValue.name, "name", initValue?.name),
      ...returnObjectIfExist(
        !!initValue.description,
        "description",
        initValue?.description as string
      ),
      ...returnObjectIfExist(
        !!initValue.establishmentDate,
        "establishmentDate",
        new Date(initValue?.establishmentDate)
      ),
      ...returnObjectIfExist(
        !!initValue?.industryId,
        "industry",
        getIndustry(initValue?.industryId as number)
      ),
      ...returnObjectIfExist(!!settings?.coverImage, "coverImage", [
        removeTypename(settings?.coverImage),
      ]),
      ...returnObjectIfExist(!!settings?.profileImage, "profileImage", [
        removeTypename(settings?.profileImage),
      ]),
      ...returnObjectIfExist(
        !!settings?.contactNumber,
        "contactNumber",
        settings?.contactNumber
      ),
      ...returnObjectIfExist(
        !!settings?.employeeAmount,
        "employeeAmount",
        settings?.employeeAmount as number
      ),
      ...returnObjectIfExist(
        !!initValue?.location,
        "location",
        getLocationByName(initValue?.location as string)
      ),
      ...returnObjectIfExist(
        !!settings?.address,
        "address",
        settings?.address as string
      ),
      ...returnObjectIfExist(
        !!initValue?.businessTypeIds,
        "businessTypes",
        getBusinessTypes(initValue?.businessTypeIds as any)
      ),
      ...returnObjectIfExist(
        !!settings?.mainProducts,
        "mainProducts",
        generateMainProducts(settings?.mainProducts || [])
      ),
    } as any,
    details: {
      ...returnObjectIfExist(
        !!settings?.branches,
        "branches",
        removeTypenameOfChildrens(settings?.branches || [])
      ),
      ...returnObjectIfExist(
        !!settings?.factories,
        "factories",
        removeTypenameOfChildrens(settings?.factories || [])
      ),
      ...returnObjectIfExist(
        !!settings?.warehouses,
        "warehouses",
        removeTypenameOfChildrens(settings?.warehouses || [])
      ),
    } as any,
    additional: {
      certificates:
        removeTypenameOfChildrens(settings?.certificates || []) || [],
      gallery: removeTypenameOfChildrens(settings?.gallery || []) || [],
    },
  };
  return data;
}

const CompanyDetailsForm: React.FC<ICompanyDetailsFormProps> = ({
  initValue,
}) => {
  const { t } = useTranslation("form");
  const { updateCompProfile } = useWSChat();
  const methods = useForm<ECFormValues>({
    resolver: yupResolver(ECFormResolver),
    ...(!!initValue ? { defaultValues: getDefaultValue(initValue) } : {}),
  });
  const {
    register,
    control,
    trigger,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = methods;

  const { startListen, stopListen } = useIsEditedFormHandler();
  useEffect(() => {
    startListen(!!dirtyFields.general);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!dirtyFields.general]);

  const { query, ...router } = useRouter();
  const [updateCompany, { loading: updatingCompany }] =
    useUpdateCompanyDetailMutation({ onCompleted: handleCompanyUpdated });
  const [uploadFiles, { loading: uploadingFiles }] = useUploadFilesMutation();

  const formPosition = parseInt(query.formPosition as string) || 1;

  useEffect(() => {
    if (formPosition > EC_INPUT_FORM_INDEX && isEmpty(dirtyFields.general))
      changeSection(EC_INPUT_FORM_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeSection(newPosition: number) {
    const { pathname } = router;
    router.replace({
      pathname,
      query: { ...query, formPosition: newPosition },
    });
  }

  function handleCompanyUpdated({
    updateCompany,
  }: UpdateCompanyDetailMutation) {
    const { payload, success } = updateCompany ?? {};
    if (success && !!payload) {
      setIsFullInfoTrue();
      Swal.fire({
        icon: "success",
        title: t("companyEdited-success-message"),
      });
      router.replace(`/${ROUTES.COMPANY_DETAIL}`);
    } else {
      Swal.fire({
        icon: "error",
        title: t("companyEdited-error-message"),
      });
    }
  }

  const generalRef = useRef(null);
  const detailsRef = useRef(null);
  const additionalRef = useRef(null);

  const isGeneralVisible = useOnScreen(generalRef as any);
  const isDetailsVisible = useOnScreen(detailsRef as any, "00px");
  const isAdditionalVisible = useOnScreen(additionalRef as any, "-300px");

  useEffect(() => {
    let visible: TVisible = "GENERAL";
    if (isDetailsVisible) visible = "DETAILS";
    if (isAdditionalVisible) visible = "ADDITIONAL";

    if (focusedSection !== visible) setFocusedSection(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGeneralVisible, isAdditionalVisible, isDetailsVisible]);

  async function handleNextClick() {
    const general = await trigger("general");
    const details = await trigger("details");
    const additional = await trigger("additional");

    if (!general) scrollToSection(generalRef);
    else if (!details) scrollToSection(detailsRef);
    else if (!additional) scrollToSection(additionalRef);
    else if (formPosition < EC_REVIEW_FORM_INDEX)
      changeSection(formPosition + 1);
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  async function onSubmit(value: ECFormValues) {
    const { general, details, additional } = value;
    let uploadedCoverImg = general.coverImage;
    let uploadedProfileImg: any = general.profileImage;

    const {
      branches: rawBranches,
      factories: rawFactories,
      warehouses: rawWarehouses,
    } = details;

    if (uploadedCoverImg?.[0].isNew) {
      const blobCover = await generateBlobs(general.coverImage);
      uploadedCoverImg = await getUploadedFiles(uploadFiles, blobCover);
    }

    if (uploadedProfileImg?.[0].isNew) {
      const blobProfile = await generateBlobs(general.profileImage);
      uploadedProfileImg = await getUploadedFiles(uploadFiles, blobProfile);
    }

    const { certificates, gallery } = additional;

    const oldCertificates = certificates.filter((c) => !c.isNew);
    const oldGallery = gallery.filter((img) => !img.isNew);

    const newCertificates = certificates.flatMap(({ isNew, ...c }) =>
      isNew ? c : []
    );
    const newGallery = gallery.flatMap(({ isNew, ...img }) =>
      isNew ? img : []
    );

    const blobCertificates = await generateBlobs(newCertificates as any);
    const blobGallery = await generateBlobs(newGallery as any);

    const uploadedCertificates = await getUploadedFiles(
      uploadFiles,
      blobCertificates
    );
    const uploadedGallery = await getUploadedFiles(uploadFiles, blobGallery);

    const mainProducts = general?.mainProducts?.map((mp: any) => mp.label);

    let branches = await getBfws(uploadFiles, rawBranches);
    let factories = await getBfws(uploadFiles, rawFactories);
    let warehouses = await getBfws(uploadFiles, rawWarehouses);

    const businessTypeIds = general.businessTypes.map((bt) => bt.id);
    stopListen();

    const input: IUpdateCompanyDetailsInput | any = {
      establishmentDate: general.establishmentDate,
      name: general.name,
      description: general.description as any,
      industryId: (general.industry as any).id,
      location: general.location.name,
      businessTypeIds,
      isFullInfo: true,
      settings: {
        certificates: [...oldCertificates, ...uploadedCertificates],
        gallery: [...oldGallery, ...uploadedGallery],
        address: general.address,
        coverImage: uploadedCoverImg?.[0],
        profileImage: uploadedProfileImg?.[0],
        employeeAmount: general.employeeAmount,
        contactNumber: general.contactNumber,
        mainProducts: mainProducts as any,
        branches: branches as any,
        factories: factories as any,
        warehouses: warehouses as any,
      },
    };

    if (!!uploadedProfileImg?.[0].url) {
      updateCompProfile(uploadedProfileImg?.[0].url, general.contactNumber);
    }
    updateCompany({ variables: { id: getCompanyId()!, input } });
  }

  const [focusedSection, setFocusedSection] = useState<TVisible>("GENERAL");

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
    {
      label: "additional-nav-label",
      sectionName: "ADDITIONAL",
      reference: additionalRef,
    },
  ];

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className={`grid grid-cols-5 relative`}>
          <div className={`col-span-4 space-y-4`}>
            <SectionWrapper
              ref={generalRef}
              sectionTitle={t("general-nav-label")}
            >
              <ECGeneralInput
                register={register}
                control={control}
                errors={errors}
                initValue={initValue}
                trigger={trigger}
              />
            </SectionWrapper>
            <SectionWrapper
              ref={detailsRef}
              sectionTitle={t("details-nav-label")}
            >
              <ECDetailsInput
                setValue={setValue}
                register={register}
                control={control}
                errors={errors}
                trigger={trigger}
                getValues={getValues}
              />
            </SectionWrapper>
            <SectionWrapper
              ref={additionalRef}
              sectionTitle={t("additional-nav-label")}
            >
              <ECAdditionalInput
                register={register}
                control={control}
                errors={errors}
                trigger={trigger}
                getValues={getValues}
              />
            </SectionWrapper>
            <PostNavNextBackButton
              endPosition={EC_REVIEW_FORM_INDEX}
              formPosition={formPosition}
              onNextClick={handleNextClick}
              loading={uploadingFiles || updatingCompany}
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
      </Form>
    </FormProvider>
  );
};
export default CompanyDetailsForm;
