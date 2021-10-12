import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import Button from "@components/ui/storybook/button";
import React from "react";
import { useTranslation } from "react-i18next";

interface IEditDeleteButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

const EditDeleteButton: React.FC<IEditDeleteButtonProps> = ({ ...props }) => {
  const { t } = useTranslation("common");

  return (
    <div {...props}>
      <div className="flex justify-between">
        <button className="w-1/2.5 border-2 border-gray-200 text-gray-200 rounded-md flex-center">
          <TrashCanIcon className="mr-2" />
          <p>{t("delete-button-label")}</p>
        </button>
        <Button className="w-1/2.5">
          <PencilIcon className="mr-2" />
          {t("edit-button-label")}
        </Button>
      </div>
    </div>
  );
};
export default EditDeleteButton;
