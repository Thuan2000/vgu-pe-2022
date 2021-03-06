import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import React from "react";
import { Control, FieldErrors, UseFormTrigger } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useIsPhone from "src/hooks/isPhone.hook";
import InlineFormInputWrapper from "../inline-form-input-wrapper";
import InlineLabel from "../inline-label";
import { INLINE_LABEL_WIDTH } from "../post-tender-constants";
import { PostRequestFormValue } from "../post-request-schema";

interface IPRFBudgetInputProps extends React.HTMLAttributes<HTMLDivElement> {
  control: Control<PostRequestFormValue>;
  trigger: UseFormTrigger<PostRequestFormValue>;
  errors?: FieldErrors<PostRequestFormValue>;
  numberQueue: number;
}

const PRFBudgetInput: React.FC<IPRFBudgetInputProps> = ({
  control,
  errors,
  trigger,
  className,
  numberQueue,
  ...props
}) => {
  const { t } = useTranslation("form");
  const isPhone = useIsPhone();

  const isMinBudgetError = !!errors?.details?.minBudget;
  const isMaxBudgetError = !!errors?.details?.minBudget;

  return (
    <div
      className={`${
        !isPhone && (isMinBudgetError || isMaxBudgetError) && "!mb-10"
      } ${className}`}
      {...props}
    >
      <InputLabel
        numberQueue={numberQueue}
        required
        label={t("post-request-budget-label")}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-8">
        <InlineFormInputWrapper
          className={`${
            isMinBudgetError && "!items-start"
          } sm:w-1/2.5 justify-between`}
        >
          <InlineLabel
            labelWidth={INLINE_LABEL_WIDTH}
            className={`${isMinBudgetError && "!mt-2"}`}
            text={t("min-budget-label")}
          />
          <NumberInput
            name="details.minBudget"
            control={control}
            placeholder={t("post-request-budget-placeholder")}
            suffix={` ${t("budget-sign")}`}
            onChange={() => {
              trigger("details.minBudget");
            }}
            className={`w-full`}
            absoluteErrorMessage={!isPhone}
            allowNegative={false}
            error={t(errors?.details?.minBudget?.message || "")}
          />
        </InlineFormInputWrapper>
        <InlineFormInputWrapper
          className={`${isMaxBudgetError && "!items-start"} sm:w-1/2.5`}
        >
          <InlineLabel
            labelWidth={INLINE_LABEL_WIDTH}
            className={`${isMaxBudgetError && "!mt-2"}`}
            text={t("max-budget-label")}
          />
          <NumberInput
            name="details.maxBudget"
            control={control}
            placeholder={t("post-request-budget-placeholder")}
            suffix={` ${t("budget-sign")}`}
            onChange={() => {
              trigger("details.maxBudget");
            }}
            absoluteErrorMessage={!isPhone}
            allowNegative={false}
            className={`w-full`}
            error={t(errors?.details?.maxBudget?.message || "")}
          />
        </InlineFormInputWrapper>
      </div>
    </div>
  );
};
export default PRFBudgetInput;
