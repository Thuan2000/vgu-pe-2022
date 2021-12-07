import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../storybook/typography";

interface ICDDetailQuestionAnswerProps {
  question: string;
  answer: string | number;
}

const CDDetailQuestionAnswer: React.FC<ICDDetailQuestionAnswerProps> = ({
  question,
  answer,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className="fic space-x-2 items-start">
      <Typography
        className={`flex-shrink-0`}
        text={`${question}:`}
        variant="description"
      />
      <Typography
        text={answer ? answer.toString() : t("not-setup")}
        variant="smallTitle"
      />
    </div>
  );
};
export default CDDetailQuestionAnswer;
