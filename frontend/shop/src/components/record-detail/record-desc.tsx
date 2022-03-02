import ChatNowButton from "@components/ui/chat-now-button";
import Typography from "@components/ui/storybook/typography";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { ICompany } from "@graphql/types.graphql";
import { trimText } from "@utils/functions";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import React from "react";

interface ISDDescriptionProps {
  industryId: number;
  categoryId: number;
  description: string;
  location: string;
  company: ICompany;
  type: "SERVICE" | "PRODUCT";
}

const RecordDescription: React.FC<ISDDescriptionProps> = ({
  industryId,
  categoryId,
  description,
  location,
  company,
  type,
}) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  function getIndustryCategory() {
    return `${t("industry:" + getIndustry(industryId)?.label)} › ${t(
      "category:" + getCategory(categoryId)?.label
    )}`;
  }

  function scrollToDetail() {
    router.replace("#detail");
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex space-x-2">
        <Typography text={`${t("location-title")}:`} className="text-black" />
        <div className="flex space-x-1 fic">
          <Typography text={location} variant="smallTitle" />
        </div>
      </div>
      <div className="flex space-x-2">
        <Typography
          text={`${t("brd-industry-category-title")}:`}
          className="text-black"
        />
        <div className="flex space-x-1 fic">
          <Typography text={getIndustryCategory()} variant="smallTitle" />
        </div>
      </div>
      {/* It is duplicate, not necessary. */}
      {/* <div>
        <Typography
          variant="description"
          isHaveReadMore={description?.length! > 220}
          readMoreText={t("brd-readMore-text")}
          onReadMore={scrollToDetail}
          text={
            trimText(description as string, 220) || t("brd-noDescription-text")
          }
        />
      </div> */}
      <ChatNowButton
        ownStuffMessage={t(
          type === "PRODUCT"
            ? "yourProduct-message-label"
            : "yourService-message-label"
        )}
        company={company}
        className={`!h-7 mt-1 `}
      />
    </div>
  );
};
export default RecordDescription;
