import Typography from "@components/ui/storybook/typography";
import React from "react";

interface IBRDDetailQAProps {
  question: string;
  answer?: string;
}

const BRDDetailQA: React.FC<IBRDDetailQAProps> = ({
  question,
  children,
  answer,
}) => {
  return (
    <div className="fic space-x-2">
      <Typography text={question} color="gray-400" />
      {!!answer && <Typography variant="smallTitle" text={answer} />}
      {children}
    </div>
  );
};
export default BRDDetailQA;
