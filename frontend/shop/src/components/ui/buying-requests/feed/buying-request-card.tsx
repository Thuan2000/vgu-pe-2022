import Typography from "@components/ui/storybook/typography";
import Image from "next/image";
import { IBuyingRequest } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import { viDateFormat } from "@utils/functions";
import React from "react";
import { useTranslation } from "react-i18next";
import SaveIcon from "@assets/icons/save-icon";
import Chip from "@components/ui/storybook/chip";

interface IBuyingRequestCardProps {
  br: IBuyingRequest;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({ br }) => {
  const { t } = useTranslation();

  if (!br) return <></>;

  const { name, endDate, location, status, createdAt, gallery } = br;

  const cover = gallery?.at(0)?.location || siteSettings.logo.url;

  return (
    <div className="flex items-start shadow-md rounded-md">
      <div className="relative w-[240px] h-[290px] flex-shrink-0">
        <Image src={cover} alt="Good" layout="fill" />
      </div>
      <div className="w-full p-5 space-y-2">
        <div className="flex items-center justify-between">
          <Typography text={br.name} element="h3" />
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Typography
                text={`${t("due-date-text")}:`}
                variant="question"
                className="font-semibold"
              />
              <Typography
                text={viDateFormat(br.endDate)}
                variant="smallTitle"
                className="text-secondary-1"
              />
            </div>
            <SaveIcon />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* <Chip text={location} background="secondary-1" /> */}
          <Chip text={location} background="secondary-1" />
          <Chip text={t(status + "_STATUS")} background="primary" />
        </div>
      </div>
    </div>
  );
};
export default BuyingRequestCard;
