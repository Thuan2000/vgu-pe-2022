import CircleDashIcon from "@assets/icons/circle-dash-icon";
import { PlusIcon } from "@assets/icons/plus-icon";
import ThreeDotIcon from "@assets/icons/three-dot-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import Alert from "@components/ui/alert";
import loading from "@components/ui/loading";
import { useDeleteBuyingRequestMutation } from "@graphql/buying-request.graphql";
import { COLORS } from "@utils/colors";
import { viDateFormat } from "@utils/functions";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "src/contexts/modal.context";

interface IBrcExtrasProps extends React.HTMLAttributes<HTMLDivElement> {
  updatedAt: string;
  brId: number;
  refreshBr: () => void;
}

const BrcExtras: React.FC<IBrcExtrasProps> = ({
  brId,
  updatedAt,
  refreshBr,
  ...props
}) => {
  const { t } = useTranslation();

  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);
  const { openModal, closeModal } = useModal();
  const [deleteBr, { loading: deleteLoading }] =
    useDeleteBuyingRequestMutation();

  function addToProject() {}
  async function onDelete() {
    await deleteBr({ variables: { id: brId } });
    refreshBr();
  }
  function handleDeleteBrClick() {
    openModal(
      (
        <Alert
          icon={CircleDashIcon}
          title={t("remove-br-title")}
          message={`${t("remove-br-message")} ${t("singular-request-text")}?`}
          positifButtonText={t("confirm-remove-br-button-label")}
          positifButtonColor={COLORS.ERROR}
          isLoadingPositif={deleteLoading}
          onPositifClick={onDelete}
          onClose={closeModal}
          negativeButtonText={t("cancel-remove-br-button-label")}
          negativeButtonColor={COLORS.WHITE}
          negativeButtonStyle={{
            color: COLORS.GRAY[200],
            borderColor: COLORS.GRAY[200],
          }}
        />
      ) as any
    );
  }

  return (
    <div {...props}>
      <div className="flex items-center w-full pr-6">
        <div className="flex items-center">
          <h5 className="text-gray mr-1 md:text-sm">{t("posted-label")}:</h5>
          <h5 className="text-secondary-1 md:text-sm">
            {viDateFormat(updatedAt)}
          </h5>
        </div>
        <div className="ml-auto relative">
          <button
            className="p-1 pb-0"
            onClick={() => setShowThreeDotMenu(!showThreeDotMenu)}
            // onBlur={() => setShowThreeDotMenu(false)}
          >
            <ThreeDotIcon />
          </button>
          <div
            className={`border min-w-[215px] bg-white absolute right-0 z-50 rounded-md ${
              showThreeDotMenu ? "block" : "hidden"
            }`}
          >
            <ul>
              <li className="border-b border-gray-100">
                <button
                  className="pl-7 flex py-4 items-center w-full h-full"
                  onClick={addToProject}
                >
                  <PlusIcon className="ml-1 mr-4" stroke={COLORS.GRAY[200]} />
                  {t("addToProject-button-label")}
                </button>
              </li>
              <li>
                <button
                  className="pl-7 py-4 flex items-center w-full h-full"
                  onClick={handleDeleteBrClick}
                >
                  <TrashCanIcon className="mr-3" />
                  {t("delete-button-label")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrcExtras;
