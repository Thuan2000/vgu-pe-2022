import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ValidationError from "../../validation-error";
import InputLabel, { IInputLabelProps } from "../input-label";

export interface IRichTextEditorProps {
  value?: string;
  labelProps?: IInputLabelProps;
  onChange?: (e: string) => void;
  error?: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<IRichTextEditorProps> = ({
  value,
  onChange,
  labelProps,
  error,
  placeholder,
}) => {
  function handleChange(e: string) {
    if (!!onChange) onChange(e);
  }

  return (
    <div>
      {!!labelProps?.label && <InputLabel {...labelProps} />}

      <div className={`${!!labelProps?.numberQueue && "ml-8"}`}>
        <ReactQuill
          placeholder={placeholder}
          theme="snow"
          value={value || ""}
          onChange={handleChange}
          style={{}}
        />

        {!!error && <ValidationError message={error} />}
      </div>
    </div>
  );
};

export default RichTextEditor;
