import UnderlineIcon from "@assets/icons/navigations/underline-icon";
import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import InlineLabel from "@components/post-tender-form/inline-label";
import { COLORS } from "@utils/colors";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GPIServiceForm, { IService } from "./gpi-service-form";

interface IGPIServiceListItemProps {
  label: string;
  service: IService;
  labelWidth: string;
  onDelete: (serviceId: string) => void;
  onUpdate: (service: IService) => void;
}

const GPIServiceListItem: React.FC<IGPIServiceListItemProps> = ({
  label,
  service,
  labelWidth,
  onDelete,
  onUpdate,
}) => {
  const { t } = useTranslation("form");
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(true);
  }
  function handleDeleteClick() {
    onDelete(service.id);
  }

  function handleEdited(s: IService) {
    setIsEditing(false);
    onUpdate(s);
  }

  return (
    <>
      <div className={`flex ${isEditing ? "items-start" : "items-center"}`}>
        <InlineLabel
          text={label}
          textClass="font-semibold opacity-90"
          className="flex-shrink-0 text-right"
          labelWidth={labelWidth}
          narrowColon
        />
        {isEditing ? (
          <GPIServiceForm onCreate={handleEdited} initValue={service} />
        ) : (
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-300 fic">
              <span>{service.name}</span>
              <UnderlineIcon className="w-5 mx-2 mt-1" fill={"#000"} />
              <span>
                <span>
                  {service.minPrice} {t("budget-sign")}
                </span>
                <span className="mx-1">{"-"}</span>
                <span>
                  {service.maxPrice} {t("budget-sign")}
                </span>
              </span>
              <span className="mx-1">{"/"}</span>
              <span>{service.unit.name}</span>
            </p>

            <div className="space-x-5 flex items-center">
              <PencilIcon
                onClick={handleEditClick}
                className="w-4 h-4 cursor-pointer"
                fill={COLORS.GRAY[200]}
              />
              <TrashCanIcon
                onClick={handleDeleteClick}
                className="w-4 h-4 cursor-pointer"
                fill={COLORS.GRAY[200]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default GPIServiceListItem;
