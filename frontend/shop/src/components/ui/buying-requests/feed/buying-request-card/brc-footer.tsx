import MessageIcon from "@assets/icons/message-icon";
import Button from "@components/ui/storybook/button";
import React from "react";
import { useTranslation } from "react-i18next";

interface IBrcActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  handleMessageClick: () => void;
  handleBidClick: () => void;
  handleContactClick: () => void;
  isBidded: boolean;
}

const BrcFooter: React.FC<IBrcActionsProps> = ({
  handleMessageClick,
  handleBidClick,
  handleContactClick,
  isBidded,
  className,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex px-5 pt-1 items-center justify-end space-x-4 ${className}`}
      {...props}
    >
      <Button
        variant="custom"
        size="small"
        onClick={handleMessageClick}
        className="bg-white border active:bg-white outline-none"
      >
        <MessageIcon />
      </Button>
      <Button
        onClick={handleBidClick}
        size="small"
        disabled={isBidded}
        variant="outline"
        title={isBidded ? "You have bid this" : ""}
        className={`${!isBidded ? "text-primary" : "hidden"}`}
      >
        {t("bid-button-label")}
      </Button>
      <Button
        size="small"
        onClick={handleContactClick}
        className="bg-secondary-1 hover:bg-secondary-1-hover active:bg-secondary-1-active"
      >
        {t("contact-button-label")}
      </Button>
    </div>
  );
};
export default BrcFooter;
