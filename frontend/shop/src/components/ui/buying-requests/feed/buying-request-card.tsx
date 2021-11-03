import Typography from "@components/ui/storybook/typography";
import Image from "next/image";
import { IBuyingRequest } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import { getBudgetRange, trimText, viDateFormat } from "@utils/functions";
import React from "react";
import { useTranslation } from "react-i18next";
import SaveIcon from "@assets/icons/save-icon";
import Chip from "@components/ui/storybook/chip";
import VerifiedIcon from "@assets/icons/verified-icon";
import Button from "@components/ui/storybook/button";
import MessageIcon from "@assets/icons/message-icon";

interface IBuyingRequestCardProps {
  br: IBuyingRequest;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({ br }) => {
  const { t } = useTranslation("common");

  if (!br) return <></>;

  const {
    name,
    endDate,
    description,
    location,
    status,
    createdAt,
    gallery,
    minOrder,
    unit,
    minBudget,
    maxBudget,
    company,
  } = br;

  const cover = gallery?.at(0)?.location || siteSettings.logo.url;
  const isSdConnectLogo = !gallery?.at(0)?.location;

  return (
    <div className="flex items-start shadow-top-sm rounded-md pb-1">
      <div className="relative w-[210px] h-[170px] flex-shrink-0">
        <Image
          src={cover}
          alt="Good"
          objectFit={isSdConnectLogo ? "contain" : "cover"}
          layout="fill"
        />
      </div>
      <div className="w-full ml-5 pt-1 pl-0">
        <div className="w-full pr-5 space-y-[2px] border-b pb-2">
          {/* NAME */}
          <div className="space-y-[2px]">
            <div className="flex items-center justify-between">
              <Typography text={name} element="h3" className="text-md" />
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Typography
                    text={`${t("due-date-text")}:`}
                    variant="question"
                    className="font-semibold"
                  />
                  <Typography
                    text={viDateFormat(endDate)}
                    variant="smallTitle"
                    className="text-secondary-1"
                  />
                </div>
                <SaveIcon />
              </div>
            </div>
            {/* CHIPS */}
            <div className="flex items-center space-x-2">
              <Chip text={location} background="secondary-1" />
              <Chip text={t(status + "_STATUS")} background="primary" />
            </div>
            {/* Company */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Typography
                  variant="smallTitle"
                  text={company?.name}
                  className="text-primary"
                />
                <VerifiedIcon />
              </div>
              <div className="flex items-center space-x-2">
                <Typography
                  variant="question"
                  text={`${t("posted-date-text")}:`}
                />
                <Typography variant="question" text={viDateFormat(createdAt)} />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Typography
              variant="description"
              text={trimText(description || "", 140) || t("NO_DESCRIPTION")}
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Typography
                variant="smallTitle"
                className="text-primary"
                text={`${t("min-order-text")}:`}
              />
              <Typography
                variant="smallTitle"
                className="text-primary"
                text={`${minOrder} ${unit}`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Typography
                variant="description"
                text={`${t("BUDGET_LABEL")}:`}
              />
              <Typography
                variant="smallTitle"
                className="text-primary"
                text={getBudgetRange(minBudget, maxBudget, t)}
              />
            </div>
          </div>
        </div>
        <div className="flex px-5 pt-1 items-center justify-end space-x-4">
          <Button
            variant="custom"
            size="small"
            className="bg-white border active:bg-white outline-none"
          >
            <MessageIcon />
          </Button>
          <Button size="small" variant="outline" className="text-primary">
            {t("bid-button-label")}
          </Button>
          <Button
            size="small"
            className="bg-secondary-1 hover:bg-secondary-1-hover active:bg-secondary-1-active"
          >
            {t("contact-button-label")}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BuyingRequestCard;
