import Typography from "@components/ui/storybook/typography";
import React from "react";

interface IDetailQAProps {
  question: string;
  answer?: string;
}

const DetailQA: React.FC<IDetailQAProps> = ({ question, children, answer }) => {
  return (
    <div className="fic space-x-2">
      <Typography text={question} color="gray-400" />
      {!!answer && <Typography variant="smallTitle" text={answer} />}
      {children}
    </div>
  );
};
export default DetailQA;
