import { PlusIcon } from "@assets/icons/plus-icon";
import ThreeDotIcon from "@assets/icons/three-dot-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { COLORS } from "@utils/colors";
import { viDateFormat } from "@utils/functions";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IBrcExtrasProps extends React.HTMLAttributes<HTMLDivElement> {
  updatedAt: string;
  brId: number;
  onDeleteClick: () => void;
  onAddToProjectClick: () => void;
  deleteButtonLabel: string;
  addToProjectButtonLabel: string;
  postedTextLabel: string;
}

const BrcExtras: React.FC<IBrcExtrasProps> = ({
  brId,
  updatedAt,
  onDeleteClick,
  deleteButtonLabel,
  addToProjectButtonLabel,
  onAddToProjectClick,
  postedTextLabel,
  ...props
}) => {
  const { t } = useTranslation();

  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);

  return (
    <div {...props}>
      <div className="flex items-center w-full pr-6">
        <div className="flex items-center">
          <h5 className="text-gray mr-1 md:text-sm">{postedTextLabel}:</h5>
          <h5 className="text-secondary-1 md:text-sm">
            {viDateFormat(updatedAt)}
          </h5>
        </div>
        <div className="ml-auto relative">
          <button
            className="p-1 pb-0"
            onClick={() => setShowThreeDotMenu(true)}
            onBlur={() => setShowThreeDotMenu(false)}
          >
            <ThreeDotIcon />
            {showThreeDotMenu && (
              <div
                className={`border min-w-[215px] bg-white absolute right-0 z-50 rounded-md`}
              >
                <ul>
                  <li className="border-b border-gray-100">
                    <div
                      className="pl-7 flex py-4 items-center w-full h-full"
                      onClick={onAddToProjectClick}
                    >
                      <PlusIcon
                        className="ml-1 mr-4"
                        stroke={COLORS.GRAY[200]}
                      />
                      {addToProjectButtonLabel}
                    </div>
                  </li>
                  <li>
                    <div
                      className="pl-7 py-4 flex items-center w-full h-full"
                      onClick={onDeleteClick}
                    >
                      <TrashCanIcon className="mr-3" />
                      {deleteButtonLabel}
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default BrcExtras;
