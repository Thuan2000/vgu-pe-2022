import MessageIcon from "@assets/icons/message-icon";
import { ICompany } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";
import { getChatUrl } from "@utils/routes";
import { useTranslation } from "next-i18next";
import React from "react";
import Link from "./link";
import Button from "./storybook/button";

interface IChatNowButtonProps {
  company: ICompany;
  className?: string;
}

const ChatNowButton: React.FC<IChatNowButtonProps> = ({
  company,
  className,
}) => {
  const { t } = useTranslation();
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
            <MessageIcon className="mr-3 w-3 h-3" />
            {t("chatNow-button-label")}
          </Button>
        </Link>
      ) : (
        <Button disabled size="small" className={`${className} !text-xs`}>
          {t("yourCompanyRequest-button-label")}
        </Button>
      )}
    </>
  );
};
export default ChatNowButton;
