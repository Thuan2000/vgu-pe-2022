import Typography from "@components/ui/storybook/typography";
import React from "react";

interface IFilterLabelProps {
  text: string;
}

const FilterLabel: React.FC<IFilterLabelProps> = ({ text }) => {
  return <Typography text={text} variant="smallTitle" className="mb-[2px]" />;
};
export default FilterLabel;
