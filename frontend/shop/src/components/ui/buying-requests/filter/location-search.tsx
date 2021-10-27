import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@storybook/typography";
import SelectInput from "@components/ui/storybook/inputs/select-input";
import { useForm } from "react-hook-form";
import { IVietnamCity, vietnamCities } from "@utils/vietnam-cities";

interface ILocationSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const LocationSearch: React.FC<ILocationSearchProps> = ({ ...props }) => {
  const { t } = useTranslation();

  const { control } = useForm();

  return (
    <div {...props}>
      <Typography
        text={t("location-filter-label")}
        variant="smallTitle"
        className="mb-4"
      />
      <SelectInput
        control={control}
        options={vietnamCities}
        name="location-filter"
        getOptionLabel={(opt: IVietnamCity) => opt.name}
        getOptionValue={(opt: IVietnamCity) => opt.name}
      />
    </div>
  );
};
export default LocationSearch;
