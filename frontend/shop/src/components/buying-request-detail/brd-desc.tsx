import MessageIcon from "@assets/icons/message-icon";
import ChatNowButton from "@components/ui/chat-now-button";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { ICompany, IProject } from "@graphql/types.graphql";
import { trimText, getCompanyId } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";

interface IBRDDescriptionProps {
  projects: IProject[];
  industryId: number;
  categoryId: number;
  description: string;
  company: ICompany;
}

const BRDDescription: React.FC<IBRDDescriptionProps> = ({
  projects,
  industryId,
  categoryId,
  description,
  company,
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
          onReadMore={() => null}
          text={
            trimText(description as string, 220) || t("brd-noDescription-text")
          }
        />
      </div>
      <ChatNowButton
        ownStuffMessage={t("yourRequest-message-label")}
        company={company}
        className={`!h-7 mt-1 `}
      />
    </div>
  );
};
export default BRDDescription;
