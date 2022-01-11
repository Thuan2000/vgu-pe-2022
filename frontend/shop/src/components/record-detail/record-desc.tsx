import MessageIcon from "@assets/icons/message-icon";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { trimText, getCompanyId } from "@utils/functions";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import React from "react";

interface ISDDescriptionProps {
  industryId: number;
  categoryId: number;
  description: string;
  companyId: number;
  location: string;
}

const RecordDescription: React.FC<ISDDescriptionProps> = ({
  industryId,
  categoryId,
  description,
  companyId,
  location,
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
      <div>
        <Typography
          variant="description"
          isHaveReadMore={description?.length! > 220}
          readMoreText={t("brd-readMore-text")}
          onReadMore={scrollToDetail}
          text={
            trimText(description as string, 220) || t("brd-noDescription-text")
          }
        />
      </div>
      {companyId !== getCompanyId() && (
        <Button
          variant="custom"
          size="small"
          className="border py-3 px-8 text-gray border-gray !h-"
        >
          <MessageIcon className="mr-3" />
          {t("chatNow-button-label")}
        </Button>
      )}
    </div>
  );
};
export default RecordDescription;
