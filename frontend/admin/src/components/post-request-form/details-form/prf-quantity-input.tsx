import Input from "@components/ui/storybook/inputs/input";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import { useTranslation } from "next-i18next";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import useIsPhone from "src/hooks/isPhone.hook";
import InlineFormInputWrapper from "../inline-form-input-wrapper";
import InlineLabel from "../inline-label";
import { INLINE_LABEL_WIDTH } from "../post-request-constants";
import { PostRequestFormValue } from "../post-request-schema";

interface IPRFQuantityInputProps extends React.HTMLAttributes<HTMLDivElement> {
  control: Control<PostRequestFormValue>;
  errors?: FieldErrors<PostRequestFormValue>;
  register: UseFormRegister<PostRequestFormValue>;
  trigger: UseFormTrigger<PostRequestFormValue>;
  numberQueue: number;
}
const PRFQuantityInput: React.FC<IPRFQuantityInputProps> = ({
  control,
  errors,
  numberQueue,
  register,
  trigger,
  className,
  ...props
}) => {
  const { t } = useTranslation("form");

  const isPhone = useIsPhone();

  const isUnitError = !!errors?.details?.unit;
  const isMinOrderError = !!errors?.details?.minOrder;
  return (
    <div
      className={`${
        !isPhone && (isUnitError || isMinOrderError) && "!mb-10"
      } ${className}`}
      {...props}
    >
      <InputLabel
        label={t("post-request-minOrder-label")}
        required
        numberQueue={numberQueue}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-8">
        <InlineFormInputWrapper
          className={`sm:w-1/2.5 ${isMinOrderError && "!items-start"}`}
        >
          <InlineLabel
            labelWidth={INLINE_LABEL_WIDTH}
            className={`${isMinOrderError && "!mt-2"} ${!isPhone && "hidden"}`}
            text={t("quantity-label")}
          />
          <NumberInput
            placeholder={t("post-request-minOrder-placeholder")}
            name="details.minOrder"
            className="w-full"
            control={control}
            allowNegative={false}
            onChange={() => {
              trigger("details.minOrder");
            }}
            absoluteErrorMessage={!isPhone}
            error={t(errors?.details?.minOrder?.message || "")}
          />
        </InlineFormInputWrapper>
        <InlineFormInputWrapper
          className={`${isUnitError && "!items-start"} sm:w-1/2.5`}
        >
          <InlineLabel
            labelWidth={INLINE_LABEL_WIDTH}
            className={`${isUnitError && "!mt-2"}`}
            text={t("unit-label")}
          />
          <Input
            placeholder={t("post-request-unit-placeholder")}
            {...register("details.unit")}
            onChange={(e) => {
              register("details.unit").onChange(e);
              trigger("details.unit");
            }}
            absoluteErrorMessage={!isPhone}
            error={t(errors?.details?.unit?.message || "")}
          />
        </InlineFormInputWrapper>
      </div>
    </div>
  );
};
export default PRFQuantityInput;
