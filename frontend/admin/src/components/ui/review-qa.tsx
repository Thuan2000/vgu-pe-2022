import Typography from "@components/ui/storybook/typography";
import React from "react";

interface IReviewQAProps {
  label: string;
  value: string;
}

const ReviewQA: React.FC<IReviewQAProps> = ({ label, value }) => {
  return (
    <div>
      <Typography className="text-semibold" text={label} />
      <p className="font-semibold flex-wrap">{value}</p>
    </div>
  );
};
export default ReviewQA;
