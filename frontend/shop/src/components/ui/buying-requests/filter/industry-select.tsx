import { useIndustriesQuery } from "@graphql/industry.graphql";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";
import SelectInput from "@storybook/inputs/select-input";
import Typography from "@storybook/typography";
import { IIndustry } from "@graphql/types.graphql";

interface IIndustrySelectProps extends React.HTMLAttributes<HTMLDivElement> {}

const IndustrySelect: React.FC<IIndustrySelectProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation();
  const { control } = useForm();

  const { data } = useIndustriesQuery();
  const industries = data?.industries;

  return (
    <div {...props}>
      <Typography
        text={t("industry-filter-label")}
        variant="smallTitle"
        className="mb-4"
      />
      <SelectInput
        options={industries || []}
        name="industry"
        control={control}
        getOptionValue={(option: IIndustry) => option?.name}
        getOptionLabel={(option: IIndustry) => option?.name}
      />
    </div>
  );
};
export default IndustrySelect;
