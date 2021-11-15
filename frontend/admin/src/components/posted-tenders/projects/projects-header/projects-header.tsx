import FolderDownloadIcon from "@assets/icons/folder-download-icon";
import FolderIcon from "@assets/icons/folder-icon";
import SearchInput from "@components/search-input";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Checkbox from "@components/ui/storybook/checkbox";
import { IProject } from "@graphql/types.graphql";
import { COLORS } from "@utils/colors";
import { ROUTES } from "@utils/routes";
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface IProjectsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isCheckedSelectAll: boolean;
  isSelecting: boolean;
  onDeleteProjects: () => void;
  deleting: boolean;
}

const ProjectsHeader: React.FC<IProjectsHeaderProps> = ({
  onSelectChange,
  deleting,
  isCheckedSelectAll,
  isSelecting,
  onDeleteProjects,
}) => {
  const { t } = useTranslation();

  return (
    <div className="sm:flex items-center justify-between w-full px-4">
      <SearchInput className="hidden sm:flex w-60" />
      <div className="flex items-center justify-between sm:space-x-4">
        <Checkbox
          name="select-all-project"
          label={t("select-all-label")}
          className="text-gray py-2 w-1/2.5 sm:w-32 rounded-sm flex-center border-2 font-semibold"
          onChange={onSelectChange}
          checked={isCheckedSelectAll}
        />
        {isSelecting ? (
          <Button
            className="w-1/2.5"
            size="small"
            loading={deleting}
            style={{ backgroundColor: COLORS.ERROR }}
            onClick={onDeleteProjects}
          >
            <FolderDownloadIcon className="mr-2" />
            {t("deleteProject-button-label")}
          </Button>
        ) : (
          <Link className="w-1/2.5" href={`${ROUTES.POSTED_REQUESTS}`}>
            <Button size="small" className="w-full">
              <FolderDownloadIcon className="mr-2" />
              {t("createProject-button-label")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default ProjectsHeader;
