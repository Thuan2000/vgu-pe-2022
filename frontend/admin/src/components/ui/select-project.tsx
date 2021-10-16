import PdfIcon from "@assets/icons/files/pdf-icon";
import { PlusIcon } from "@assets/icons/plus-icon";
import SearchIcon from "@assets/icons/search-icon";
import PhoneAdminNavbar from "@components/phone-admin-navbar";
import { COLORS } from "@utils/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "src/contexts/modal.context";
import Button from "./storybook/button";
import Input from "./storybook/inputs/input";
import Loader from "./storybook/loader/loader";

interface ISelectProjectProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: any[];
  title: string;
  loading: boolean;
  createNewLabel: string;
  noProjectMessage: string;
  onNewClick: () => void;
  onProjectClick: (project: any) => void;
}

const SelectProject: React.FC<ISelectProjectProps> = ({
  projects,
  loading,
  className,
  title,
  onProjectClick,
  createNewLabel,
  noProjectMessage = "You don't have any project yet",
  onNewClick,
  ...props
}) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();

  const projectList = projects?.map((pr) => {
    return (
      <button
        className="flex items-center w-full pl-5 py-2 active:bg-gray-10"
        key={pr.name}
        onClick={() => onProjectClick(pr)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            pr?.image?.location ||
            "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/image-placeholder.jpg"
          }
          width={30}
          height={30}
          alt="image-preview"
          className="mr-4"
        />
        <h2 className="text-md">{pr.name}</h2>
      </button>
    );
  });

  return (
    <div
      {...props}
      className="relative flex flex-col rounded-sm items-center bg-white px-5 sm:pt-5 w-full sm:w-[400px] min-h-screen sm:min-h-[400px]"
    >
      <PhoneAdminNavbar
        pageName={t("select-project-page-name")}
        onBackClick={() => closeModal()}
        className="w-full sm:hidden fixed"
        showBackArrow={true}
      />
      <h2 className="hidden sm:flex">{title}</h2>
      <div className="hidden sm:flex items-center py-1 my-5 border rounded-md w-full">
        <Input noLabel noBorder className="h-9 w-full" />
        <button type="button" className="border-gray-200 h-9 p-3 flex-center">
          <SearchIcon fill={COLORS.GRAY[200]} />
        </button>
      </div>
      {loading ? (
        <Loader className="max-h-60" />
      ) : (
        <div className="mt-[120px] mb-[78px] w-full overflow-auto sm:mt-0 sm:max-h-64">
          {!!projectList?.length ? (
            projectList
          ) : (
            <h3 className="text-center mt-10 sm:mt-5">{noProjectMessage}</h3>
          )}
        </div>
      )}

      <button
        className="fixed sm:absolute bottom-0 flex items-center w-full px-5 py-5 shadow-top bg-white"
        onClick={onNewClick}
      >
        <div className="p-2 rounded flex-center bg-gray-10 mx-5">
          <PlusIcon />
        </div>
        <p className="text-md text-dark-blue font-semibold">{createNewLabel}</p>
      </button>
    </div>
  );
};
export default SelectProject;
