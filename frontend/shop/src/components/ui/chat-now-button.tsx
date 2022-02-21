import MessageIcon from "@assets/icons/message-icon";
import { ICompany } from "@graphql/types.graphql";
import { isLogin } from "@utils/auth-utils";
import { firePleaseLoginSwal, getCompanyId } from "@utils/functions";
import { getChatUrl, ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";
import Link from "./link";
import PleaseLoginButton from "./please-login-button";
import Button from "./storybook/button";

interface IChatNowButtonProps {
  company: ICompany;
  className?: string;
  ownStuffMessage?: string;
  isOnTender?: boolean;
}

const ChatNowButton: React.FC<IChatNowButtonProps> = ({
  company,
  className,
  ownStuffMessage,
  isOnTender,
}) => {
  const { t } = useTranslation();
  async function handleClick() {
    if (isLogin()) window.open(getChatUrl(company?.chatId!), "_blank");
    else {
      const texts = {
        confirmButton: t("common:stay-button-label"),
      };
      const { isDenied } = await firePleaseLoginSwal(t, Swal, texts);
      if (isDenied) window.open(ROUTES.LOGIN, "_blank");
    }
  }

  return (
    <>
      {!isLogin() || company?.id !== getCompanyId() ? (
        <Button
          variant="custom"
          size="small"
          color="primary"
          className={`${className} border text-gray-300 border-gray-300 active:text-primary !text-xs`}
          onClick={handleClick}
        >
          <MessageIcon className="mr-3 w-4 h-4" />
          {t("chatNow-button-label")}
        </Button>
      ) : (
        <Button disabled size="small" className={`${className} !text-xs`}>
          {ownStuffMessage || t("yourCompanyRequest-button-label")}
        </Button>
      )}
    </>
  );
};
export default ChatNowButton;
