import MessageIcon from "@assets/icons/message-icon";
import { ICompany } from "@graphql/types.graphql";
import { isLogin } from "@utils/auth-utils";
import { getCompanyId } from "@utils/functions";
import { getChatUrl, ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import React from "react";
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

  if (!isLogin()) return <PleaseLoginButton disabled={isOnTender} />;

  return (
    <>
      {company?.id !== getCompanyId() ? (
        <Link
          className="flex"
          href={getChatUrl(company?.chatId!)}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            variant="custom"
            size="small"
            color="primary"
            className={`${className} border text-gray-300 border-gray-300 active:text-primary !text-xs`}
          >
            <MessageIcon className="mr-3 w-4 h-4" />
            {t("chatNow-button-label")}
          </Button>
        </Link>
      ) : (
        <Button disabled size="small" className={`${className} !text-xs`}>
          {ownStuffMessage || t("yourCompanyRequest-button-label")}
        </Button>
      )}
    </>
  );
};
export default ChatNowButton;
