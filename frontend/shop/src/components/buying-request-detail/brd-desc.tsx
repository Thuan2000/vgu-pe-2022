import MessageIcon from "@assets/icons/message-icon";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { IProject } from "@graphql/types.graphql";
import { trimText, getCompanyId } from "@utils/functions";
import { getChatUrl, ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import React from "react";

interface IBRDDescriptionProps {
  projects: IProject[];
  industryId: number;
  categoryId: number;
  description: string;
  companyId: number;
  chatId: string;
}

const BRDDescription: React.FC<IBRDDescriptionProps> = ({
  projects,
  industryId,
  categoryId,
  description,
  companyId,
  chatId,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="mt-3 space-y-2">
      <div className="flex space-x-2">
        <Typography
          text={`${t("brd-project-title")}:`}
          className="text-black"
        />
        <div className="flex">
          {!!projects?.length ? (
            projects?.map((p) => (
              <Typography
                key={p.name + p.companyId}
                text={p.name}
                variant="smallTitle"
              />
            ))
          ) : (
            <Typography
              text={t("brd-notBelongToProject-text")}
              variant="smallTitle"
            />
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <Typography
          text={`${t("brd-industry-category-title")}:`}
          className="text-black"
        />
        <div className="flex space-x-1">
          <Typography
            text={t("industry:" + getIndustry(industryId)?.label)}
            variant="smallTitle"
          />

          <Typography text=">" variant="smallTitle" />

          <Typography
            text={t("category:" + getCategory(categoryId)?.label)}
            variant="smallTitle"
          />
        </div>
      </div>
      <div>
        <Typography
          variant="description"
          isHaveReadMore={description?.length! > 220}
          readMoreText={t("brd-readMore-text")}
          onReadMore={() => {
            console.log("Scrolling");
          }}
          text={
            trimText(description as string, 220) || t("brd-noDescription-text")
          }
        />
      </div>
      {companyId !== getCompanyId() && (
        <Link href={getChatUrl(chatId)} target="_blank">
          <Button
            variant="custom"
            size="small"
            className="border py-3 px-8 text-gray border-gray !h-"
          >
            <MessageIcon className="mr-3" />
            {t("chatNow-button-label")}
          </Button>
        </Link>
      )}
    </div>
  );
};
export default BRDDescription;
