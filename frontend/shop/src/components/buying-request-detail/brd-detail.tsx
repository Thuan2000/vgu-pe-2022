import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { getSourceType } from "@datas/source-types";
import { IBuyingRequest } from "@graphql/types.graphql";
import {
  formatMoneyAmount,
  getMoneySuffix,
  getSuffix,
  trimText,
  viDateFormat,
} from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import BRDDetailQA from "../ui/detail-qa";

interface IBRDDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
}

const BRDDetail: React.FC<IBRDDetailProps> = ({ br }) => {
  const { t } = useTranslation("common");
  const [isShowMore, setIsShowMore] = useState(false);
  function getDesc() {
    if (!br.description) return t("noDescription-text");
    return isShowMore
      ? br.description
      : trimText(br.description as string, 350);
  }

  function handleShowMore() {
    setIsShowMore((old) => !old);
  }

  function getPrice() {
    return `${formatMoneyAmount(br.minBudget!)}${t(
      getMoneySuffix(br.maxBudget)
    )} ${t("budget-sign")} - ${formatMoneyAmount(br.maxBudget!)}${t(
      getMoneySuffix(br.maxBudget)
    )} ${t("budget-sign")}`;
  }

  return (
    <div
      className={`general p-4 border space-y-2 relative rounded-md ${
        !isShowMore && "pb-9"
      }`}
    >
      <Typography text={t("brd-details-title")} variant="title" size="md" />
      <div className="grid grid-cols-2 space-y-1">
        <BRDDetailQA
          question={`${t("brd-budget-title")}:`}
          answer={getPrice()}
        />
        <BRDDetailQA
          question={`${t("brd-minOrder-title")}:`}
          answer={`${br.minOrder} ${br.unit}`}
        />
        <BRDDetailQA
          question={`${t("brd-location-title")}:`}
          answer={`${br.location}`}
        />

        {br?.sourceTypeId && (
          <BRDDetailQA
            question={`${t("brd-sourceType-title")}:`}
            answer={t("source-type:" + getSourceType(br?.sourceTypeId)?.label)}
          />
        )}

        <BRDDetailQA
          question={`${t("brd-endDate-title")}:`}
          answer={viDateFormat(br.endDate)}
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

      {!!br?.description && br?.description?.length > 350 && (
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
              ? t("brd-view-more-button-label")
              : t("brd-view-less-button-label")}
          </Button>
        </div>
      )}
    </div>
  );
};
export default BRDDetail;
