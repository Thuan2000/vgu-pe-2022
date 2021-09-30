import CityInput from "@components/city-input";
import React from "react";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { PostRequestFormValue } from ".";

interface IAdditionalFormProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
}

const AdditionalForm: React.FC<IAdditionalFormProps> = ({
  register,
  control,
}) => {
  return (
    <div className="mt-5">
      <h3>Additional Information</h3>
    </div>
  );
};
export default AdditionalForm;
