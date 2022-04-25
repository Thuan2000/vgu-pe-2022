import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";

interface IReviewQAProps {
  label: string;
  value: string;
  isDescription?: boolean;
}

const ReviewQA: React.FC<IReviewQAProps> = ({
  label,
  value,
  isDescription,
}) => {
  const { t } = useTranslation();

  const notSetup = t("not-setted-up");

  function getValue() {
    if (!value || value.includes("undefined")) return notSetup;

    return value;
  }

  return (
    <div>
      <Typography className="text-semibold" text={label} />
      {isDescription ? (
        <div
          className={`wysiwyg`}
          dangerouslySetInnerHTML={{
            __html:
              value ||
              `<p className="font-semibold flex-wrap">${getValue()}</p>`,
          }}
        />
      ) : (
        <p className="font-semibold flex-wrap">{value || getValue()}</p>
      )}
    </div>
  );
};
export default ReviewQA;
