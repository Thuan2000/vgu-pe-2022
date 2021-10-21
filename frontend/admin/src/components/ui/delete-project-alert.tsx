import CircleDashIcon from "@assets/icons/circle-dash-icon";
import { COLORS } from "@utils/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "src/contexts/modal.context";
import Alert from "./alert";

interface IDeleteProjectAlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onDeleteClick: () => void;
}

const DeleteProjectAlert: React.FC<IDeleteProjectAlertProps> = ({
  className,
  isLoading,
  onDeleteClick,
}) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();

  return (
    <Alert
      icon={CircleDashIcon}
      title={t("remove-project-title")}
      message={`${t("remove-project-message")} ${t("singular-request-text")}?`}
      positifButtonText={t("confirm-remove-project-button-label")}
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
export default DeleteProjectAlert;
