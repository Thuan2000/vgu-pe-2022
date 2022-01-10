import Typography from "@components/ui/storybook/typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { IProductDimension } from "../pps-product-interface";

interface IPPSProductDimensionReviewProps {
  dimension: IProductDimension;
  title: string;
}

const PPSProductDimensionReview: React.FC<IPPSProductDimensionReviewProps> = ({
  dimension,
  title,
}) => {
  const { t } = useTranslation("form");

  function QAItem({ q, a }: { q: string; a?: string | number }) {
    return (
      <div className={`fic space-x-2`}>
        <Typography size="xs" text={`${q}: `} />
        <Typography size="xs" text={a + ""} weight="semibold" />
      </div>
    );
  }

  return (
    <div className={`space-y-2`}>
      <Typography text={title} weight="bold" color="black" />

      <div className={`grid grid-cols-2 gap-x-2 gap-y-2`}>
        <QAItem
          q={t("mesure-unit-text-label")}
          a={dimension?.measureUnit || (t("-") as any)}
        />
        <QAItem
          q={t("width-text-label")}
          a={dimension?.width || (t("-") as any)}
        />
        <QAItem
          q={t("height-text-label")}
          a={dimension?.height || (t("-") as any)}
        />
        <QAItem
          q={t("length-text-label")}
          a={dimension?.length || (t("-") as any)}
        />
        <QAItem
          q={t("weight-text-label")}
          a={
            dimension?.weight && dimension?.weightUnit
              ? `${dimension?.weight}${dimension?.weightUnit}`
              : (t("-") as any)
          }
        />
      </div>
    </div>
  );
};
export default PPSProductDimensionReview;
