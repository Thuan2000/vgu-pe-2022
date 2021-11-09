import Input from "@components/ui/storybook/inputs/input";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import { useTranslation } from "next-i18next";
import React from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import InlineFormInputWrapper from "../inline-form-input-wrapper";
import InlineLabel from "../inline-label";
import { INLINE_LABEL_WIDTH } from "../post-request-constants";
import { PostRequestFormValue } from "../post-request-schema";

interface IPRFQuantityInputProps extends React.HTMLAttributes<HTMLDivElement> {
  control: Control<PostRequestFormValue>;
  errors?: FieldErrors<PostRequestFormValue>;
  register: UseFormRegister<PostRequestFormValue>;
}
const PRFQuantityInput: React.FC<IPRFQuantityInputProps> = ({
  control,
  errors,
  register,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <InputLabel
        label={`${t("post-request-minOrder-label")}*`}
        numberQueue={3}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-8">
        <InlineFormInputWrapper>
          <InlineLabel
            labelWidth={INLINE_LABEL_WIDTH}
            text={t("quantity-label")}
          />
          <NumberInput
            placeholder={t("post-request-minOrder-placeholder")}
            name="details.minOrder"
            control={control}
            allowNegative={false}
            error={errors?.details?.minOrder?.message}
          />
        </InlineFormInputWrapper>
        <InlineFormInputWrapper>
          <InlineLabel labelWidth={INLINE_LABEL_WIDTH} text={t("unit-label")} />
          <Input
            placeholder={t("post-request-minOrder-placeholder")}
            {...register("details.unit")}
            error={errors?.details?.minOrder?.message}
          />
        </InlineFormInputWrapper>
      </div>
    </div>
  );
};
export default PRFQuantityInput;
