import RichTextEditor, { IRichTextEditorProps } from "./rich-text-editor";

import React from "react";
import { Control, Controller } from "react-hook-form";

interface IRichTextInputProps extends IRichTextEditorProps {
  name: string;
  control: Control<any>;
}

const RichTextInput: React.FC<IRichTextInputProps> = ({
  name,
  control,
  onChange: parentOnChange,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...restField } }) => {
        return (
          <RichTextEditor
            {...props}
            {...restField}
            onChange={(e) => {
              onChange(e);
              if (!!parentOnChange) parentOnChange(e);
            }}
          />
        );
      }}
    />
  );
};
export default RichTextInput;
