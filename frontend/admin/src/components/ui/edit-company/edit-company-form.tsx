import Form from "@components/form";
import { getBusinessType } from "@datas/businessTypes";
import { getIndustry } from "@datas/industries";
import {
  UpdateCompanyDetailMutation,
  useUpdateCompanyDetailMutation,
} from "@graphql/company.graphql";
import { ICompany, IUpdateCompanyDetailsInput } from "@graphql/types.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { getMeData, setMeData } from "@utils/auth-utils";
import {
  getCompanyId,
  removeTypename,
  removeTypenameOfChildrens,
} from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { getLocationByName } from "@utils/vietnam-cities";
import { isEmpty } from "lodash";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Button from "../storybook/button";
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

// @URGENT Check this again
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
        !!initValue?.businessTypeId,
        "businessType",
        getIndustry(initValue?.businessTypeId as number)
      ),
      ...returnObjectIfExist(
        !!initValue?.industryId,
        "industry",
        getIndustry(initValue?.industryId as number)
      ),
      ...returnObjectIfExist(
        !!initValue?.industryId,
        "coverImage",
        getIndustry(initValue?.industryId as number)
      ),
      ...returnObjectIfExist(!!settings?.coverImage, "coverImage", [
        removeTypename(settings?.coverImage),
      ]),
      ...returnObjectIfExist(
        !!settings?.profileImage,
        "profileImage",
        removeTypename(settings?.profileImage)
      ),
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
        !!settings?.location,
        "location",
        getLocationByName(settings?.location as string)
      ),
      ...returnObjectIfExist(
        !!settings?.address,
        "address",
        settings?.address as string
      ),
      ...returnObjectIfExist(
        !!initValue?.businessTypeId,
        "businessType",
        getBusinessType(initValue?.businessTypeId as number)
      ),
      ...returnObjectIfExist(!!settings?.mainProducts, "mainProducts", []),
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
  const {
    register,
    control,
    trigger,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<ECFormValues>({
    resolver: yupResolver(ECFormResolver),
    ...(!!initValue ? { defaultValues: getDefaultValue(initValue) } : {}),
  });
  const { query, ...router } = useRouter();
  const [updateCompany, { loading: updatingCompany }] =
    useUpdateCompanyDetailMutation({ onCompleted: handleCompanyUpdated });
  const formPosition = parseInt(query.formPosition as string) || 1;

  useEffect(() => {
    if (formPosition > EC_GENERAL_FORM_INDEX && isEmpty(dirtyFields.general))
      changeSection(EC_GENERAL_FORM_INDEX);
  });

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
      const { user, company: oldCompany } = getMeData();

      setMeData({
        user: user!,
        company: { id: oldCompany, ...JSON.parse(payload) },
      });
      Swal.fire({
        icon: "success",
        title: t("companyEdited-success-message"),
      });
      router.replace(oldCompany?.slug as string);
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

  function turnLocationToString({ location, ...bfw }: IRawBFW) {
    return {
      ...bfw,
      location: location.name || location,
      ...(bfw.gallery.length > 0
        ? { gallery: removeTypenameOfChildrens(bfw.gallery || []) }
        : {}),
    };
  }

  function onSubmit(value: ECFormValues) {
    const { general, details, additional } = value;

    const coverImage =
      general &&
      general.coverImage &&
      general?.coverImage?.length > 0 &&
      (general?.coverImage as any)[0];

    const mainProducts = general?.mainProducts?.map((mp: any) => mp.label);
    const branches = details?.branches?.map((b: any) =>
      turnLocationToString(b)
    );
    const factories = details?.factories?.map((f: any) =>
      turnLocationToString(f)
    );
    const warehouses = details?.warehouses?.map((w: any) =>
      turnLocationToString(w)
    );

    const input: IUpdateCompanyDetailsInput | any = {
      establishmentDate: general.establishmentDate,
      name: general.name,
      description: general.description as any,
      industryId: (general.industry as any).id,
      businessTypeId: general.businessType.id as any,
      settings: {
        certificates: additional.certificates,
        address: general.address,
        location: general.location.name,
        profileImage: general.profileImage,
        employeeAmount: general.employeeAmount,
        gallery: additional.gallery,
        contactNumber: general.contactNumber,
        coverImage: coverImage as any,
        mainProducts: mainProducts as any,
        branches: branches as any,
        factories: factories as any,
        warehouses: warehouses as any,
      },
    };
    updateCompany({ variables: { id: getCompanyId(), input } });
  }

  return (
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

      <div className="fic justify-between">
        <Button variant="cancel">{t("previewCompany-button-label")}</Button>
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
            // loading={creating || updating}
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
  );
};
export default CompanyDetailsForm;
