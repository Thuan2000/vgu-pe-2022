import ImageIcon from "@assets/icons/image-icon";
import LocationIcon from "@assets/icons/location-icon";
import MessageIcon from "@assets/icons/message-icon";
import SaveIcon from "@assets/icons/save-icon";
import VerifiedIcon from "@assets/icons/verified-icon";
import ChatNowButton from "@components/ui/chat-now-button";
import Link from "@components/ui/link";
import RecordCardName from "@components/ui/record-card-name";
import Button from "@components/ui/storybook/button";
import Chip from "@components/ui/storybook/chip";
import Typography from "@components/ui/storybook/typography";
import { getCategory, getCategoryByLabel } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { IBuyingRequest } from "@graphql/types.graphql";
import { isLogin } from "@utils/auth-utils";
import { viDateFormat, trimText, getCompanyId } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import React from "react";
import { useTranslation } from "react-i18next";

interface IBrcInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
}

const BrcInfo: React.FC<IBrcInfoProps> = ({ br, className, ...props }) => {
  const { t } = useTranslation();

  const {
    name,
    endDate,
    location,
    company,
    createdAt,
    status,
    industryId,
    categoryId,
  } = br;

  return (
    <div className={`w-full px-5 space-y-1 py-2 ${className}`} {...props}>
      {/* NAME */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <RecordCardName
            href={`${ROUTES.TENDERS}/${br.slug}`}
            title={`${t("requestNamePrefix-value")} - ${name}`}
            isShouldLogin
          />
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Typography
                text={`${t("due-date-text")}:`}
                variant="question"
                className="font-semibold"
                size="xs"
              />
              <Typography
                text={viDateFormat(endDate)}
                variant="smallTitle"
                className="text-secondary-1"
                size="xs"
              />
            </div>
            {/* <SaveIcon /> */}
          </div>
        </div>
        {/* CHIPS */}
        <div className="fic space-x-2">
          <Chip
            size="xs"
            icon={LocationIcon}
            text={!isLogin() ? "Please Login" : location}
            background="secondary-1"
          />
          <Chip
            size="xs"
            text={t(status + "_STATUS")}
            background={status === "OPEN" ? "primary" : "error"}
          />
          <Chip
            size="xs"
            text={`${t("industry:" + getIndustry(industryId)?.label)} › ${t(
              "category:" + getCategory(categoryId)?.label
            )}`}
            background="transparent"
            textColor="black"
          />
        </div>

        {/* Company */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2`}>
            <Typography
              size="xs"
              variant="smallTitle"
              text={!isLogin() ? "Please Login" : company?.name!}
            />
            <VerifiedIcon />
          </div>

          <div className="flex items-center space-x-2">
            <Typography
              size="xs"
              variant="question"
              text={`${t("posted-date-text")}:`}
            />
            <Typography
              size="xs"
              variant="question"
              text={viDateFormat(createdAt)}
            />
          </div>
        </div>
      </div>

      {/* Desc */}
      <div className="flex items-center justify-between space-x-2 sm:min-w-[520px]">
        {/* <Typography
          size="xs"
          variant="description"
          text={trimText(br.description || "", 140) || t("NO_DESCRIPTION")}
        /> */}

        <div
          dangerouslySetInnerHTML={{ __html: br.description || "" }}
          className={`overflow-hidden h-6 w-96 wysiwyg`}
        />

        <ChatNowButton company={company!} isOnTender />
      </div>
      {/* Buy Info */}
      {/* <div className="flex items-center space-x-2">
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
          <Typography variant="description" text={`${t("BUDGET_LABEL")}:`} />
          <Typography
            variant="smallTitle"
            className="text-primary"
            text={getBudgetRange(minBudget, maxBudget, t)}
          />
        </div>
      </div> */}
    </div>
  );
};
export default BrcInfo;
