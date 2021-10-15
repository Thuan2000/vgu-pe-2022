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
  onProjectClick: (id: number) => void;
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

  const projectList = projects.map((pr) => {
    return (
      <button
        className="flex items-center w-full pl-5 py-2 active:bg-gray-10"
        key={pr.name}
        onClick={() => onProjectClick(pr.id)}
      >
        <PdfIcon className="w-10 h-10 mr-5" />
        <h2>{pr.name}</h2>
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
        className="w-full sm:hidden"
        showBackArrow={true}
      />
      <h2 className="hidden sm:flex">{title}</h2>
      <div className="hidden sm:flex items-center py-1 my-5 border rounded-md w-full">
        <Input noLabel noBorder className="h-9 w-full" />
        <button className="border-gray-200 h-9 p-3 flex-center">
          <SearchIcon fill={COLORS.GRAY[200]} />
        </button>
      </div>
      {loading ? (
        <Loader className="max-h-60" />
      ) : (
        <div className="max-h-64 w-full overflow-auto">
          {!!projectList.length ? (
            projectList
          ) : (
            <h3 className="text-center mt-10 sm:mt-5">{noProjectMessage}</h3>
          )}
        </div>
      )}

      <button
        className="fixed absolute bottom-0 flex items-center w-full px-5 py-3 shadow-top"
        onClick={onNewClick}
      >
        <div className="w-10 rounded flex-center bg-gray-10 mr-5">
          <PlusIcon />
        </div>
        <p className="text-md text-dark-blue font-semibold">{createNewLabel}</p>
      </button>
    </div>
  );
};
export default SelectProject;
