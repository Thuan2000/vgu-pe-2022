/**
 * THis component should used inside formProvider of react hook form
 */

import Input from "@components/ui/storybook/inputs/input";
import InputLabel, {
  IInputLabelProps,
} from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import { isEmpty } from "lodash";
import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IProductDimension } from "./pps-product-interface";

interface IDimensionInputProps extends Partial<IDimensionFormProps> {
  name: string;
  control: Control<any>;
}

const DimensionInput: React.FC<IDimensionInputProps> = ({
  name,
  control,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name } }) => (
        <DimensionForm
          name={name}
          onChange={onChange}
          value={value}
          {...props}
        />
      )}
    />
  );
};

interface IDimensionFormProps {
  labelProps?: IInputLabelProps;
  value: IProductDimension;
  name: string;
  title?: string;
  onChange: (e: IProductDimension) => void;
}

export const DimensionForm: React.FC<IDimensionFormProps> = ({
  labelProps,
  name,
  title,
}) => {
  const { register, control } = useFormContext();
  const { t } = useTranslation("form");

  const labelWidth = 150;
  return (
    <div>
      {!isEmpty(labelProps) && <InputLabel {...labelProps} />}

      <div className={`${labelProps?.label && "ml-8"}`}>
        {!!title && (
          <Typography text={t("post-product-dimension-form-label")} size="sm" />
        )}

        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div className="fic">
            <Typography
              style={{
                width: labelWidth,
                paddingRight: 5,
              }}
              align="right"
              size="xs"
              text={`${t("measureUnit-dimension-input-label")} : `}
              weight="semibold"
            />
            <Input
              {...register(`${name}.measureUnit`)}
              placeholder={`${t("measureUnit-dimension-input-placeholder")}`}
              className={`w-full`}
            />
          </div>
          <div className="fic">
            <Typography
              style={{
                width: labelWidth,
                paddingRight: 5,
              }}
              align="right"
              size="xs"
              text={`${t("width-dimension-input-label")} : `}
              weight="semibold"
            />
            <NumberInput
              control={control}
              name={`${name}.width`}
              placeholder={`${t("width-dimension-input-placeholder")}`}
              className={`w-full`}
            />
          </div>
          <div className="fic">
            <Typography
              style={{
                width: labelWidth,
                paddingRight: 5,
              }}
              align="right"
              size="xs"
              text={`${t("length-dimension-input-label")} : `}
              weight="semibold"
            />
            <NumberInput
              control={control}
              placeholder={`${t("length-dimension-input-placeholder")}`}
              name={`${name}.length`}
              className={`w-full`}
            />
          </div>
          <div className="fic">
            <Typography
              style={{
                width: labelWidth,
                paddingRight: 5,
              }}
              align="right"
              size="xs"
              text={`${t("height-dimension-input-label")} : `}
              weight="semibold"
            />
            <NumberInput
              control={control}
              name={`${name}.height`}
              placeholder={`${t("height-dimension-input-placeholder")}`}
              className={`w-full`}
            />
          </div>
        </div>

        <div className="fic mt-3 space-x-2">
          <div className="fic w-3/4">
            <Typography
              text={`${t("weight-dimension-input-label")} : `}
              style={{
                width: labelWidth - 70,
                paddingRight: 5,
              }}
              size="xs"
              // align="right"
              weight="semibold"
            />
            <NumberInput
              control={control}
              placeholder={`${t("weight-dimension-input-placeholder")}`}
              name={`${name}.weight`}
              className={`w-full`}
            />
          </div>

          <div className="fic">
            <Typography
              text={`${t("weightUnit-dimension-input-label")} : `}
              style={{
                width: labelWidth - 100,
              }}
              size="xs"
              weight="semibold"
            />
            <Input
              {...register(`${name}.weightUnit`)}
              placeholder={`${t("weightUnit-dimension-input-placeholder")}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DimensionInput;
