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
import { getMeData, setIsFullInfoTrue, setMeData } from "@utils/auth-utils";
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
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useWSChat } from "src/contexts/ws-chat.context";
import useIsEditedFormHandler from "src/hooks/useEditedFormHandler";
import Swal from "sweetalert2";
import Button from "../storybook/button";
import { IDUFile } from "../storybook/document-uploader/document-uploader";
import { IRawBFW } from "./ec-add-branch/bfw-constants";
import ECAdditionalInput from "./ec-additional-input";
import {
  EC_DETAILS_FORM_INDEX,
  EC_GENERAL_FORM_INDEX,
  EC_ADDITIONAL_FORM_INDEX,
} from "./ec-constants";
import ECDetailsInput from "./ec-details-input";
import ECGeneralInput from "./ec-general-input";
import { ECFormResolver } from "./ec-resolver";
import { ECFormValues } from "./ec-schema";

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
    if (formPosition > EC_GENERAL_FORM_INDEX && isEmpty(dirtyFields.general))
      changeSection(EC_GENERAL_FORM_INDEX);
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

  async function handleNextClick() {
    if (formPosition === EC_GENERAL_FORM_INDEX) {
      const data = await trigger("general");
      if (!data) return;
    }
    if (formPosition === EC_DETAILS_FORM_INDEX) {
      const data = await trigger("details");
      if (!data) return;
    }
    if (formPosition >= EC_ADDITIONAL_FORM_INDEX) {
      const data = await trigger("additional");
      if (!data) return;
      return;
    }

    changeSection(formPosition + 1);
  }

  function handleBackClick() {
    changeSection(formPosition - 1);
  }

  async function turnLocationToString(
    uploadFiles: any,
    { location, gallery, ...bfw }: IRawBFW
  ) {
    const oldGallery = gallery.filter((img) => !img.isNew);
    const newGallery: any = gallery.flatMap(({ isNew, ...img }) =>
      isNew ? img : []
    );
    const galleryBlobs = await generateBlobs(newGallery);
    const uploadedNewGallery = await getUploadedFiles(
      uploadFiles,
      galleryBlobs
    );

    return {
      ...bfw,
      location: location?.name || location,
      ...(gallery.length > 0
        ? {
            gallery: [
              ...removeTypenameOfChildrens(oldGallery || []),
              ...uploadedNewGallery,
            ],
          }
        : {}),
    };
  }

  async function getBfws(bfws?: IRawBFW[]) {
    if (!bfws || isEmpty(bfws)) return [];
    return await Promise.all(
      bfws?.map(
        async (bfw: any) => await turnLocationToString(uploadFiles, bfw)
      )
    );
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

    let branches = await getBfws(rawBranches);
    let factories = await getBfws(rawFactories);
    let warehouses = await getBfws(rawWarehouses);

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

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {formPosition === EC_GENERAL_FORM_INDEX && (
          <ECGeneralInput
            register={register}
            control={control}
            errors={errors}
            initValue={initValue}
            trigger={trigger}
          />
        )}
        {formPosition === EC_DETAILS_FORM_INDEX && (
          <ECDetailsInput
            setValue={setValue}
            register={register}
            control={control}
            errors={errors}
            trigger={trigger}
            getValues={getValues}
          />
        )}
        {formPosition === EC_ADDITIONAL_FORM_INDEX && (
          <ECAdditionalInput
            register={register}
            control={control}
            errors={errors}
            trigger={trigger}
            getValues={getValues}
          />
        )}
        <div className="fic justify-end">
          {/* TODO: Re-enable this after it has a functioning Preview feature */}
          {/* <Button variant="cancel">{t("previewCompany-button-label")}</Button> */}
          <div className="flex flex-col md:flex-row justify-between md:w-1/3">
            <Button
              type="button"
              variant="outline"
              size="small"
              onClick={handleBackClick}
              className={`${
                formPosition <= 1 && "invisible hidden md:block"
              } md:w-1/2.5 my-2 md:my-0 text-primary`}
            >
              {t("back-button-label")}
            </Button>
            <Button
              type={
                formPosition === EC_ADDITIONAL_FORM_INDEX ? "submit" : "button"
              }
              onClick={handleNextClick}
              size="small"
              className="md:w-1/2.5"
              loading={updatingCompany || uploadingFiles}
              autoFocus={formPosition === EC_ADDITIONAL_FORM_INDEX}
            >
              {t(
                formPosition === EC_ADDITIONAL_FORM_INDEX
                  ? "update-company-button-label"
                  : "next-section-button-label"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
};
export default CompanyDetailsForm;
