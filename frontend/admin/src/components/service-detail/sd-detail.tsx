import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { IBuyingRequest, IService } from "@graphql/types.graphql";
import { thousandSeparator, trimText } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import DetailQA from "../ui/detail-qa";

interface ISDDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  service: IService;
}

const SDDetail: React.FC<ISDDetailProps> = ({ service }) => {
  const { description, minPrice, maxPrice, categoryId, industryId, price } =
    service;
  const { t } = useTranslation("common");
  const [isShowMore, setIsShowMore] = useState(false);
  function getDesc() {
    if (!description) return t("noDescription-text");
    return isShowMore ? description : trimText(description as string, 350);
  }

  function handleShowMore() {
    setIsShowMore((old) => !old);
  }

  function getIndustryCategory() {
    return `${t("industry:" + getIndustry(industryId)?.label)} › ${t(
      "category:" + getCategory(categoryId)?.label
    )}`;
  }

  function getPrice() {
    if (!maxPrice && !minPrice)
      return `${thousandSeparator(price)} ${t("budget-sign")}`;

    return `${thousandSeparator(minPrice!)} ${t("budget-sign")} 
    - ${thousandSeparator(maxPrice!)} ${t("budget-sign")}`;
  }

  return (
    <div
      id="detail"
      className={`general p-4 border space-y-2 relative rounded-md ${
        !isShowMore && "pb-9"
      }`}
    >
      <Typography text={t("details-title")} variant="title" size="md" />
      <div className="grid grid-cols-2 space-y-1">
        <DetailQA question={`${t("budget-title")}:`}>
          <Typography variant="smallTitle" text={getPrice()} />
        </DetailQA>
        <DetailQA
          question={`${t("location-title")}:`}
          // answer={`${location}`}
          answer={`Hanoi`}
        />
        <DetailQA
          question={`${t("industry-category-title")}:`}
          answer={getIndustryCategory()}
        />
      </div>

      <div className="relative">
        <Typography
          {...(!isShowMore
            ? {
                className:
                  "text-transparent bg-clip-text bg-gradient-to-b from-black to-transparent",
              }
            : {})}
          variant="description"
          text={getDesc()}
        />
      </div>

      {!!service?.description && service?.description?.length > 350 && (
        <div
          className={`${!isShowMore && "absolute bottom-2 w-full px-4 left-0"}`}
        >
          <Button
            className="w-full bg-white text-primary border"
            variant="custom"
            size="fluid"
            onClick={handleShowMore}
          >
            {!isShowMore
              ? t("view-more-button-label")
              : t("view-less-button-label")}
          </Button>
        </div>
      )}
    </div>
  );
};
export default SDDetail;
