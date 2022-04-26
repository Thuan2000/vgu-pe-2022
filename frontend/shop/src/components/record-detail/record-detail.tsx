import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { IProduct, IService } from "@graphql/types.graphql";
import { thousandSeparator, trimText } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import DetailQA from "../ui/detail-qa";

interface IRecordDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  record: IService | IProduct;
}

const RecordDetail: React.FC<IRecordDetailProps> = ({ record }) => {
  const {
    description,
    minPrice,
    maxPrice,
    categoryId,
    industryId,
    price,
    location,
    warehouseLocation,
  } = record as any;
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
      <Typography text={t("brd-details-title")} variant="title" size="md" />
      <div className="grid grid-cols-2 space-y-1">
        <DetailQA question={`${t("brd-budget-title")}:`}>
          <Typography variant="smallTitle" text={getPrice()} />
        </DetailQA>
        <DetailQA
          question={`${t("location-title")}:`}
          answer={`${warehouseLocation || location}`}
        />
        <DetailQA
          question={`${t("industry-title")}:`}
          answer={getIndustryCategory()}
        />
      </div>

      <div className="relative">
        <div
          dangerouslySetInnerHTML={{ __html: record.description || "" }}
          className={`wysiwyg`}
        />
      </div>

      {!!record?.description && record?.description?.length > 350 && (
        <div
          dangerouslySetInnerHTML={{ __html: record.description || "" }}
          className={`overflow-hidden h-24 w-96 wysiwyg`}
        />
      )}
    </div>
  );
};
export default RecordDetail;
