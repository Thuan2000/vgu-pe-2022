import Button from "@components/ui/storybook/button";
import { useTranslation } from "next-i18next";
import React from "react";

interface IReviewSectionTitleProps {
  title: string;
  onClick: () => void;
}

const ReviewSectionTitle: React.FC<IReviewSectionTitleProps> = ({
  title,
  onClick,
}) => {
  const { t } = useTranslation("form");
  return (
    <div className={`flex justify-between`}>
      <h3>{title}</h3>
      <Button onClick={onClick} variant="custom" className="text-secondary-1">
        {t("edit-label")}
      </Button>
    </div>
  );
};
export default ReviewSectionTitle;
