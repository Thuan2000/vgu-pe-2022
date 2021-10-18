import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import PhoneAdminNavbar from "@components/phone-admin-navbar";
import { PAGE_NAME } from "@utils/pagePath";
import ImageInput from "@components/ui/image-input";
import Input from "@components/ui/storybook/inputs/input";
import TextArea from "@components/ui/storybook/inputs/text-area";
import DateInput from "@components/ui/storybook/inputs/date-input";
import Button from "@components/ui/storybook/button";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RequestSelector from "@components/ui/requests-selector";
import { useBRContext } from "src/contexts/buying-request.context";
import { IBuyingRequest, IProject, IProjectBr } from "@graphql/types.graphql";
import { indexOf, remove } from "lodash";
import Modal from "@components/ui/modal";
import Form from "./form";
import {
  useAddToProjectMutation,
  useCreateProjectMutation,
} from "@graphql/project.graphql";
import { getMeData } from "@utils/auth-utils";
import { trimText } from "@utils/functions";

type CreateProjectFormValues = {
  name: string;
  endDate: Date;
  description: string;
  image: any;
};

const cpSchema = yup.object({
  name: yup.string().required("project-name-required-error"),
  endDate: yup.date().required("project-name-required-error"),
});

const CreateProject = () => {
  const {
    selecteds,
    setSelecteds,
    isCreatingProject,
    closeCreateProject,
    refetchBrs,
    projectInitValue: initValue,
  } = useBRContext();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    resolver: yupResolver(cpSchema),
  });

  const [isHaveNewBr, setIsHaveNewBr] = useState<boolean>();

  useEffect(() => {
    const filterUnchecked = selecteds.filter(
      (selected) => (selected as any).unChecked !== true
    );
    const filterAlreadyAdded = filterUnchecked.filter(
      (selected) => (selected as any).alreadyAdded !== true
    );

    setIsHaveNewBr(filterAlreadyAdded.length > 0);
  }, [selecteds]);

  useEffect(() => {
    if (initValue) {
      setValue("name", initValue.name);
      setValue("image", initValue.image);
      setValue("endDate", new Date(initValue.endDate));
      setValue("description", initValue.description || "");
    }
  });

  const { t } = useTranslation("form");

  const [createProject, { loading }] = useCreateProjectMutation({
    onCompleted: handleOnCreateProjectComplete,
  });
  const [addToProject, { loading: atpLoading }] = useAddToProjectMutation({
    onCompleted: handleOnCreateProjectComplete,
  });

  function handleOnCreateProjectComplete(data: any) {
    const createProject = data?.createProject;
    const addToProject = data?.addToProject;
    const { success, message } = createProject || addToProject;

    if (success === false) {
      alert(t(`common:PROJECT-${message}-ERROR`));
      return;
    }
    if (success) {
      closeCreateProject();
      refetchBrs();
      setSelecteds([]);
      reset();
    }
  }

  function handleAlreadyAddedBr(br: IBuyingRequest) {
    const added = remove(selecteds, br)[0];

    const newBrWithAlreadyAdded = Object.assign({}, added, {
      alreadyAdded: true,
    });
    setSelecteds([...selecteds, newBrWithAlreadyAdded]);
  }

  function uncheckBr(br: any) {
    const unChecked = remove(selecteds, br)[0];

    const newBrWithUnchecked = Object.assign({}, unChecked, {
      unChecked: true,
    });
    setSelecteds([...selecteds, newBrWithUnchecked]);
  }

  function handleBrSelectionChange(
    e: ChangeEvent<HTMLInputElement>,
    br: IBuyingRequest
  ) {
    // By default this function will be called with !e.target.checked first
    if (!e.target.checked) {
      // Update selecteds and get removed value in one command
      uncheckBr(br);
    }
    if (e.target.checked) {
      (br as any).unChecked = false;
      setSelecteds([...selecteds]);
    }
  }

  function handleCloseModal() {
    setSelecteds([]);
    closeCreateProject();
  }

  function handleCancelButton() {
    setSelecteds([]);
    closeCreateProject();
  }

  async function onSubmit({ endDate, ...e }: CreateProjectFormValues) {
    if (!initValue) {
      const filteredUnchecked = selecteds.filter(
        (br) => !(br as any).unChecked === true
      );
      const buyingRequests = filteredUnchecked.map((br) => ({
        id: parseInt(br.id),
        cover: br?.gallery?.at(0)?.location,
      }));

      const { company, user } = getMeData();
      const values = {
        ...e,
        endDate: endDate.getTime(),
        buyingRequests,
        companyId: company?.id,
        createdById: user?.id,
        companyName: company?.name,
      };
      // console.log(values);
      await createProject({ variables: { input: values } });
    }

    if (initValue) {
      const filteredAdded = selecteds.filter(
        (br) => (br as any).alreadyAdded !== true
      );
      const filteredUnchecked = filteredAdded.filter(
        (br) => !(br as any).unChecked === true
      );

      const buyingRequests = filteredUnchecked.map((br) => ({
        id: parseInt(br.id),
        cover: br?.gallery?.at(0)?.location,
      }));

      addToProject({
        variables: { projectId: parseInt(initValue.id + ""), buyingRequests },
      });
    }
  }

  function getCurrentBrIds(projectBrs: IProjectBr[]): number[] {
    const brIds = projectBrs?.map((projectBr) => projectBr.id);

    return brIds;
  }

  return (
    <Modal
      onClose={handleCloseModal}
      isOpen={isCreatingProject}
      className="py-0"
      isPhoneFullScreenContent
    >
      <PhoneAdminNavbar
        pageName={t(PAGE_NAME.CREATE_PROJECT)}
        showBackArrow
        onBackClick={handleCloseModal}
        className="sm:hidden w-full"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white relative overflow-hidden sm:pt-3 sm:px-3 sm:my-3 sm:rounded-md py-5 pb-20 min-w-full sm:min-w-[400px] flex flex-col items-center">
          <div className="bg-primary items-center justify-between bg-opacity-20 px-5 py-4 hidden" />
          <p className="hidden sm:block font-semibold text-3xl text-dark-blue">
            {t("common:create-project-title")}
          </p>
          <ImageInput
            control={control}
            name="image"
            className="w-64 h-36 mt-5 sm:hidden"
            changePhotoLabel={t("change-photo-label")}
          />
          <div className="w-full px-5 space-y-5 mt-10 sm:mt-5">
            <div className="flex w-full items-start">
              <ImageInput
                control={control}
                disabled={!!initValue}
                name="image"
                className="w-72 h-40 mr-5 hidden sm:block"
                changePhotoLabel={t("change-photo-label")}
              />
              <div className="w-full space-y-4">
                <Input
                  {...register("name", { disabled: !!initValue })}
                  label={`${t("project-name-input-label")}*`}
                  placeholder={t("project-name-input-placeholder")}
                  error={errors?.name?.message}
                />
                <DateInput
                  control={control}
                  disabled={!!initValue}
                  name="endDate"
                  minDate={new Date()}
                  label={`${t("endDate-input-label")}*`}
                  error={errors?.endDate?.message}
                  placeholder={t("project-endDate-input-placeholder")}
                />
              </div>
            </div>
            <TextArea
              {...register("description", { disabled: !!initValue })}
              label={t("project-description-input-label")}
              error={errors?.description?.message}
              rows={3}
              placeholder={t("project-description-input-placeholder")}
            />
          </div>
          <RequestSelector
            onAlreadyAdded={handleAlreadyAddedBr}
            onBrSelectionChange={handleBrSelectionChange}
            loading={false}
            currentBrIds={getCurrentBrIds(initValue?.buyingRequests || [])}
            label={t("project-addRequests-label")}
            alreadyAddedMessage={t("brAddedAlready-message")}
            getBrCoverSrc={(br: any) => br?.gallery?.at(0)?.location}
            getBrLabel={(br: any) => trimText(br?.name, 15)}
            getBrChecked={(br: any) => !br?.unChecked}
            className="w-full px-5"
            noRequestMessage={t("noRequests-message")}
            requests={selecteds}
          />
          <div className="fixed shadow-top sm:absolute bottom-0 flex justify-between sm:justify-end sm:space-x-5 bg-white z-[500] w-full px-5 py-3">
            <Button
              variant="cancel"
              onClick={handleCancelButton}
              className="w-1/2.5 sm:w-36"
            >
              {t("cancel-button-label")}
            </Button>
            <Button
              type="submit"
              disabled={!isHaveNewBr}
              className="w-1/2.5 sm:w-36"
              loading={loading || atpLoading}
            >
              {!!initValue
                ? t("update-project-button-label")
                : t("create-project-button-label")}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

CreateProject.PageName = PAGE_NAME.CREATE_PROJECT;

export default CreateProject;
