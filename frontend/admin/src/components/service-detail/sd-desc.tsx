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
}

const SDDescription: React.FC<ISDDescriptionProps> = ({
  industryId,
  categoryId,
  description,
}) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  function getIndustryCategory() {
    return `${t("industry:" + getIndustry(industryId)?.label)} › ${t(
      "category:" + getCategory(categoryId)?.label
    )}`;
  }

  function scrollToDetail() {
    const { pathname } = router;
    router.replace("#detail");
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex space-x-2">
        <Typography
          text={`${t("industry-category-title")}:`}
          className="text-black"
        />
        <div className="flex space-x-1 fic">
          <Typography text={getIndustryCategory()} variant="smallTitle" />
        </div>
      </div>
      <div>
        <Typography
          variant="description"
          isHaveReadMore={description?.length! > 1300}
          readMoreText={t("readMore-text")}
          onReadMore={scrollToDetail}
          text={trimText(description, 1300)}
        />
      </div>
    </div>
  );
};
export default SDDescription;
