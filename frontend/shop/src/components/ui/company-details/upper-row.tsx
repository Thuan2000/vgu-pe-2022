import { ICompany } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";

import React from "react";
import Button from "../storybook/button";
import Typography from "../storybook/typography";
import Image from "next/image";
import MessageIcon from "@assets/icons/message-icon";
import FacebookIcon from "@assets/icons/socials/facebook-icon";
import MessangerIcon from "@assets/icons/socials/messanger-icon";
import TelegramIcon from "@assets/icons/socials/telegram-icon";
import LinkIcon from "@assets/icons/socials/link-icon";
import { getChatUrl } from "@utils/routes";
import Link from "../link";

interface ICDUpperRowProps {
  company: ICompany;
}

const CDUpperRow: React.FC<ICDUpperRowProps> = ({ company }) => {
  const { t } = useTranslation();
  const { settings } = company;
  const imageAmount = 4;

  return (
    <div className={`border relative rounded-md pb-5`}>
      <div className="relative">
        <div className="relative rounded-t-md overflow-hidden w-full h-56">
          <Image
            alt={settings?.coverImage?.fileName + "image-preview"}
            src={settings?.coverImage?.url || siteSettings.placeholderImage}
            layout="fill"
          />
        </div>
        <div className="-bottom-20 left-12 absolute w-44 h-44 rounded-full overflow-hidden">
          <Image
            alt={settings?.coverImage?.fileName + "image-preview"}
            src={settings?.profileImage?.url || siteSettings.placeholderImage}
            layout="fill"
          />
        </div>
      </div>
      <div className="flex flex-row justify-end mt-4">
        <Typography
          text={`${t("TotalPD-text")}: `}
          variant="title"
          color="gray-400"
          size="sm"
          className="mr-2 mt-2"
        />
        <Typography
          text={t("CTPD")}
          variant="BRTitle"
          size="sm"
          className="mr-5 mt-2"
        />
        <Typography
          text={`${t("RpTime-text")}: `}
          variant="title"
          color="gray-400"
          size="sm"
          className="mr-2 mt-2"
        />
        <Typography
          text={t("RT")}
          variant="BRTitle"
          size="sm"
          className="mr-5 mt-2"
        />
        <Link
          className={`mr-5`}
          href={getChatUrl(company.chatId!)}
          target="_blank"
        >
          <Button size="small" variant="cancel">
            <MessageIcon className="mr-3" />
            {t("chatNow-button-label")}
          </Button>
        </Link>
      </div>
      <div className={`pt-10 px-12 grid grid-cols-3`}>
        <div>
          <Typography
            text={company?.name as string}
            variant="BRTitle"
            className="mb-1"
          />
          <Typography
            text={`${t("companyTotalEmployee-text")}: ${
              company?.settings?.employeeAmount || t("not-setup")
            }`}
            variant="smallTitle"
            color="gray-400"
            className="mb-3"
          />
          <div className="flex">
            <Typography
              text={t("share-label")}
              variant="BRTitle"
              size="md"
              className="mt-0.5"
            />
            <FacebookIcon className="ml-2" />
            <MessangerIcon className="ml-2" />
            <TelegramIcon className="ml-2" />
            <LinkIcon className="ml-2" />
          </div>
        </div>

        {settings?.gallery && settings?.gallery?.length > 0 && (
          <div className="grid col-span-2 grid-cols-5 gap-x-5">
            {settings?.gallery?.slice(0, imageAmount).map((g) => {
              return (
                <div
                  key={g.url}
                  className={`relative flex-shrink-0 w-28 h-28 rounded-md overflow-hidden`}
                >
                  <Image
                    src={g.url}
                    layout="fill"
                    alt={g.fileName + "gallery-preview"}
                  />
                </div>
              );
            })}
            {settings?.gallery?.length >= 5 && (
              <div
                key={settings?.gallery[imageAmount].url}
                className={`relative flex-shrink-0 w-28 h-28 rounded-md overflow-hidden`}
              >
                <div
                  className={`absolute top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-60 text-white flex-center`}
                >
                  +{settings.gallery.length - imageAmount}
                </div>
                <Image
                  src={settings?.gallery[imageAmount].url}
                  layout="fill"
                  alt={
                    settings?.gallery[imageAmount].fileName + "gallery-preview"
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CDUpperRow;
