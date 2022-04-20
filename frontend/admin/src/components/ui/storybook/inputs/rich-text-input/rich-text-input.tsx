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
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <RichTextEditor {...props} {...field} />;
      }}
    />
  );
};
export default RichTextInput;
