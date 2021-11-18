import React from "react";
import { Control, Controller } from "react-hook-form";
import FAQListCreator from ".";
import { IFaq, IFAQListCreatorProps } from "./faq-list-creator";

interface IFaqInputProps extends IFAQListCreatorProps {
  control: Control<any>;
  name: string;
}

const FaqInput: React.FC<IFaqInputProps> = ({
  name,
  control,
  onChange: inputOnChange,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => {
        return (
          <>
            <FAQListCreator
              onChange={(e: IFaq[]) => {
                onChange(e);
                if (inputOnChange) inputOnChange(e);
              }}
              {...field}
              {...props}
            />
          </>
        );
      }}
    />
  );
};
export default FaqInput;
