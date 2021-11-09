import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InlineFormInputWrapper from "../inline-form-input-wrapper";
import InlineLabel from "../inline-label";
import { INLINE_LABEL_WIDTH } from "../post-request-constants";
import { PostRequestFormValue } from "../post-request-schema";

interface IPRFBudgetInputProps extends React.HTMLAttributes<HTMLDivElement> {
  control: Control<PostRequestFormValue>;
  errors?: FieldErrors<PostRequestFormValue>;
}

const PRFBudgetInput: React.FC<IPRFBudgetInputProps> = ({
  control,
  errors,
  ...props
}) => {
  const { t } = useTranslation("form");

  return (
    <div {...props}>
      <InputLabel
        numberQueue={2}
        label={`${t("post-request-budget-label")}*`}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between ml-8">
        <InlineFormInputWrapper>
          <InlineLabel
            labelWidth={INLINE_LABEL_WIDTH}
            text={t("min-budget-label")}
          />
          <NumberInput
            name="details.minBudget"
            control={control}
            placeholder={t("post-request-budget-placeholder")}
            suffix={` ${t("budget-sign")}`}
            allowNegative={false}
            error={errors?.details?.minBudget?.message}
          />
        </InlineFormInputWrapper>
        <InlineFormInputWrapper>
          <InlineLabel
            labelWidth={INLINE_LABEL_WIDTH}
            text={t("max-budget-label")}
          />
          <NumberInput
            name="details.maxBudget"
            control={control}
            placeholder={t("post-request-budget-placeholder")}
            suffix={` ${t("budget-sign")}`}
            allowNegative={false}
            error={errors?.details?.maxBudget?.message}
          />
        </InlineFormInputWrapper>
      </div>
    </div>
  );
};
export default PRFBudgetInput;
