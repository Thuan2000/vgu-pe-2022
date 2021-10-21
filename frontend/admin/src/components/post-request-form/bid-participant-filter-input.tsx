import { PlusIcon } from "@assets/icons/plus-icon";
import RemoveIcon from "@assets/icons/remove-icon";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import SelectInput from "@components/ui/storybook/select-input";
import { remove } from "js-cookie";
import React from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InlineLabel from "./inline-label";

interface IBidParticipantFilterInputProps {
  field: any;
  control: Control<any>;
  idx: number;
  append: any;
  pOptions: any[];
  remove: (idx: number | number[] | undefined) => void;
}

const BidParticipantFilterInput: React.FC<IBidParticipantFilterInputProps> = ({
  field,
  control,
  idx,
  append,
  pOptions,
  remove,
}) => {
  const { t } = useTranslation("form");
  return (
    <div className="flex items-center mb-5">
      {field.key ? (
        <InlineLabel
          labelWidth="192px"
          text={t(
            typeof field.key === "string"
              ? `${field.key}-filter-key`
              : field.key.label
          )}
        />
      ) : (
        <SelectInput
          name={`additional.allowedCompany.${idx}.key`}
          control={control}
          options={pOptions}
          autoFocus={idx > 1}
          getOptionLabel={(option) => t(option?.label)}
          getOptionValue={(option) => option?.value}
          className="w-48 md:w-1/3 mr-5"
        />
      )}
      <NumberInput
        control={control}
        className="md:w-2/3"
        name={`additional.allowedCompany.${idx}.value`}
        {...field?.key?.valueOptions}
        // error={(errors?.additional[`allowedCompany-${idx}-value`]?.message}
        placeholder={t(field?.key?.valueOptions?.placeholder)}
        suffix={` ${t(field?.key?.valueOptions?.suffix)}`}
      />
      {field.key ? (
        <button className="ml-1" onClick={() => remove(idx)} type="button">
          <RemoveIcon />
        </button>
      ) : (
        <button
          className="ml-1"
          type="button"
          onClick={() => {
            // Read control docs for this
            if (
              (control?._fields?.additional as any)?.allowedCompany[idx]?.key._f
                ?.value?.value
            )
              append({});
          }}
        >
          {/* {t("form:button-label-add")} */}
          <PlusIcon />
        </button>
      )}
    </div>
  );
};
export default BidParticipantFilterInput;
