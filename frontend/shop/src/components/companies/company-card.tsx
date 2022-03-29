import React from "react";

import { ICompaniesItem } from "@graphql/types.graphql";
import Chip from "@components/ui/storybook/chip";
import Typography from "@components/ui/storybook/typography";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import Link from "@components/ui/link";
import { trimText, getCompanyId, getCompanyExperience } from "@utils/functions";
import { siteSettings } from "@settings/site.settings";
import Image from "next/image";
import { getBusinessType } from "@datas/businessTypes";
import LocationIcon from "@assets/icons/location-icon";
import ChatNowButton from "@components/ui/chat-now-button";
import RecordCardName from "@components/ui/record-card-name";

interface ICompanyCardProps {
  company: ICompaniesItem;
}

const CompanyCard: React.FC<ICompanyCardProps> = ({ company }) => {
  const {
    id,
    name,
    slug,
    branchAmount,
    businessTypeIds,
    establishmentDate,
    settings,
    location,
    chatId,
  } = company;

  const { t } = useTranslation();

  const noInfoText = t("no-information");
  const cExperience = getCompanyExperience(establishmentDate);

  function getCompanyBusinessTypes() {
    const btLabels = businessTypeIds?.map((bti) => {
      return t("business-type:" + getBusinessType(bti!).label);
    });
    return btLabels?.join(", ");
  }

  function getCompanyMainProducts() {
    return settings?.mainProducts?.join(", ");
  }

  return (
    <div className="flex items-start border rounded-md pb-1">
      <div className={`w-full px-5 space-y-3 py-2`}>
        {/* NAME */}
        <div className="space-x-2 fic">
          <div className={`relative w-[55px] h-[55px] flex-shrink-0`}>
            <Image
              src={
                settings?.profileImage?.url ||
                siteSettings.companyProfileImagePlaceholder
              }
              alt="Good"
              layout="fill"
            />
          </div>
          <div className={``}>
            <RecordCardName
              title={name}
              href={`${ROUTES.COMPANIES}/${slug}`}
              isShouldLogin={false}
            />
            {/* CHIPS */}
            <div className="fic mt-1 space-x-2">
              <Chip
                icon={LocationIcon}
                text={location ? `${location}` : noInfoText}
              />
              <Chip
                text={
                  establishmentDate
                    ? `${cExperience.amount} ${t(cExperience.timeUnit)}`
                    : noInfoText
                }
                background={"secondary-1"}
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between space-x-2 sm:min-w-[520px]">
          <div>
            <div className="fic space-x-1">
              <Typography text={`${t("brd-businessType-title")}:`} />
              <Typography
                weight="semibold"
                text={
                  !!businessTypeIds?.length
                    ? getCompanyBusinessTypes()!
                    : noInfoText
                }
              />
            </div>
            <div className="fic space-x-1">
              <Typography text={`${t("brd-mainProduct-title")}:`} />
              <Typography
                weight="semibold"
                className={`flex-wrap`}
                text={
                  businessTypeIds
                    ? trimText(getCompanyMainProducts()!, 100)
                    : noInfoText
                }
              />
            </div>
          </div>

          <ChatNowButton
            ownStuffMessage={t("yourCompany-message-label")}
            company={company as any}
          />
        </div>
      </div>
    </div>
  );
};
export default CompanyCard;
