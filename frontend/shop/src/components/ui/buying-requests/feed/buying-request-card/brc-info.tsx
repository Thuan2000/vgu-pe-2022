import SaveIcon from "@assets/icons/save-icon";
import VerifiedIcon from "@assets/icons/verified-icon";
import Chip from "@components/ui/storybook/chip";
import Typography from "@components/ui/storybook/typography";
import { IBuyingRequest } from "@graphql/types.graphql";
import { viDateFormat, trimText, getBudgetRange } from "@utils/functions";
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
    description,
    minOrder,
    status,
    unit,
    minBudget,
    maxBudget,
  } = br;
  return (
    <div
      className={`w-full pr-5 space-y-[2px] border-b pb-2 ${className}`}
      {...props}
    >
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
          <Chip
            text={t(status + "_STATUS")}
            background={status === "OPEN" ? "primary" : "error"}
          />
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
            <Typography variant="question" text={`${t("posted-date-text")}:`} />
            <Typography variant="question" text={viDateFormat(createdAt)} />
          </div>
        </div>
      </div>
      {/* Desc */}
      <div className="flex items-center space-x-2">
        <Typography
          variant="description"
          text={trimText(description || "", 140) || t("NO_DESCRIPTION")}
        />
      </div>
      {/* Buy Info */}
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
          <Typography variant="description" text={`${t("BUDGET_LABEL")}:`} />
          <Typography
            variant="smallTitle"
            className="text-primary"
            text={getBudgetRange(minBudget, maxBudget, t)}
          />
        </div>
      </div>
    </div>
  );
};
export default BrcInfo;
