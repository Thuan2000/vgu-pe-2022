import CircleDashIcon from "@assets/icons/circle-dash-icon";
import { COLORS } from "@utils/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "src/contexts/modal.context";
import Alert from "./alert";

interface IDeleteProductAlertProps {
  isLoading: boolean;
  onDeleteClick: () => void;
}

const DeleteProductAlert: React.FC<IDeleteProductAlertProps> = ({
  isLoading,
  onDeleteClick,
}) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();

  return (
    <Alert
      icon={CircleDashIcon}
      title={t("delete-service-title")}
      message={`${t("delete-service-message")}?`}
      positifButtonText={t("confirm-button-label")}
      positifButtonColor={COLORS.ERROR}
      isLoadingPositif={isLoading}
      onPositifClick={onDeleteClick}
      onClose={closeModal}
      negativeButtonText={t("cancel-button-label")}
      negativeButtonColor={COLORS.WHITE}
      negativeButtonStyle={{
        color: COLORS.GRAY[200],
        borderColor: COLORS.GRAY[200],
      }}
    />
  );
};
export default DeleteProductAlert;
