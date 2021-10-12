import DocumentAddIcon from "@assets/icons/document-add-icon";
import FolderDownloadIcon from "@assets/icons/folder-download-icon";
import RemoveIcon from "@assets/icons/remove-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Checkbox from "@components/ui/storybook/checkbox";
import { ROUTES } from "@utils/routes";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useBRContext } from "src/contexts/buying-request.context";

interface IBuyingRequestSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BuyingRequestSearch: React.FC<IBuyingRequestSearchProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation();
  const { selecteds } = useBRContext();

  function getButtonText() {
    if (!!selecteds.length) return t("add-to-project-button-label");
    return t("create-post-button-label");
  }

  function getButtonIcon() {
    if (!!selecteds.length) return <FolderDownloadIcon className="mr-2" />;
    return <DocumentAddIcon className="mr-2" />;
  }
  return (
    <div className="flex items-center mt-4 mx-4">
      <div className="md:ml-auto flex items-center justify-between w-full md:w-fit-content">
        {!!selecteds.length && <TrashCanIcon className="mr-4" />}
        <Checkbox
          className="border-2 text-sm font-semibold text-gray h-10 flex-center w-1/2.5 md:w-fit-content md:px-5 md:mr-5 rounded-sm items-center"
          name="select-all"
          title={t("select-all")}
          label={t("select-all-label")}
        />
        <Link
          href={ROUTES.POST_REQUEST}
          className="w-1/2.5 h-10 md:w-fit-content"
        >
          <Button className="w-full h-full">
            {getButtonIcon()} {getButtonText()}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default BuyingRequestSearch;
