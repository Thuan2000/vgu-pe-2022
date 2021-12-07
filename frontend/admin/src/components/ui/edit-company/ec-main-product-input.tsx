import { generateUUID } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { Control } from "react-hook-form";
import CreateableSelectInput from "../storybook/createable-select/createable-select-input";
import { ECFormValues } from "./ec-schema";

interface IECMainProductInputProps {
  control: Control<ECFormValues>;
  name: string;
  onChange?: () => void;
  error?: string;
}

const ECMainProductInput: React.FC<IECMainProductInputProps> = ({
  control,
  name,
  error,
  onChange,
}) => {
  const { t } = useTranslation("form");

  const [opts] = useState([]);

  function onCreateNewOption(label: string) {
    return { id: generateUUID(), label };
  }

  return (
    <CreateableSelectInput
      name={name}
      createNewOption={onCreateNewOption}
      label={t("mainProducts-input-label")}
      placeholder={t("mainProducts-input-placeholder")}
      control={control}
      isMulti
      onChange={onChange}
      options={opts}
      noOptionsMessage={() => t("pleaseInputProductName-message")}
      getOptionLabel={(opt) => opt.label}
      getOptionValue={(opt) => opt.label}
      error={error}
    />
  );
};
export default ECMainProductInput;
