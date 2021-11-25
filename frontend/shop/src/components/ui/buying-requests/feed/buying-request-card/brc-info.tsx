import MessageIcon from "@assets/icons/message-icon";
import SaveIcon from "@assets/icons/save-icon";
import VerifiedIcon from "@assets/icons/verified-icon";
import Button from "@components/ui/storybook/button";
import Chip from "@components/ui/storybook/chip";
import Typography from "@components/ui/storybook/typography";
import { IBuyingRequest } from "@graphql/types.graphql";
import {
  viDateFormat,
  trimText,
  getBudgetRange,
  getCompanyId,
} from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";

interface IBrcInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
}

const BrcInfo: React.FC<IBrcInfoProps> = ({ br, className, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { name, endDate, location, company, createdAt, status, slug } = br;

  function toBrDetail() {
    router.push(`${ROUTES.TENDERS}/${slug}`);
  }

  return (
    <div className={`w-full px-5 space-y-2 py-2 ${className}`} {...props}>
      {/* NAME */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Typography
            text={name}
            element="h3"
            className="text-md cursor-pointer"
            onClick={toBrDetail}
          />
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
            <Typography variant="smallTitle" text={company?.name} />
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
          text={
            trimText(
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio accusamus tenetur sequi quod veritatis, sunt ipsam, rem doloribus, magnam et harum est libero itaque totam iste quaerat necessitatibus atque quos in? Accusamus saepe nostrum earum repellendus, tempore consectetur atque nihil dicta esse repudiandae ullam, rem maxime quaerat cum soluta impedit quis. Id fugit laudantium dolores quae non temporibus nisi est odit? Pariatur, perferendis accusantium ea, ipsam placeat beatae ex, asperiores iure dolorum quae omnis provident. Sunt blanditiis culpa minus non, voluptas consequatur voluptatum saepe est laudantium iure quasi molestiae doloribus facilis, ratione ullam id atque debitis modi recusandae quibusdam distinctio. Ea voluptatibus quisquam in ab quasi cumque quaerat est doloribus laborum laudantium, minima veniam tenetur porro veritatis. Id laboriosam quaerat eaque reiciendis, quam harum amet, necessitatibus eos provident consequatur commodi! Aut ratione culpa debitis voluptatem, explicabo eum cupiditate magni at porro sint maiores doloremque deleniti impedit recusandae sapiente quod ut esse temporibus et rem autem vitae labore. Odit accusamus ratione, dicta, non sunt dolorum nesciunt magnam aspernatur inventore, corrupti tempore tenetur laudantium! Dolor, vero perferendis quidem, velit aspernatur dolore, consequatur beatae sequi facilis necessitatibus atque exercitationem expedita consectetur architecto debitis delectus recusandae odio? Nemo similique quae mollitia in tempore tenetur!" ||
                "",
              140
            ) || t("NO_DESCRIPTION")
          }
        />
        {br.company.id !== getCompanyId() && (
          <Button
            variant="custom"
            size="small"
            className="border text-gray-300 border-gray-300 !h-"
          >
            <MessageIcon className="mr-3" />
            {t("chatNow-button-label")}
          </Button>
        )}
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
