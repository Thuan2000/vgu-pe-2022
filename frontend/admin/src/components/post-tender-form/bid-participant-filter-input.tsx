import NumberInput, {
  INumInputProps,
} from "@components/ui/storybook/inputs/number-input";
import React from "react";
import { Control } from "react-hook-form";
import InlineLabel from "./inline-label";

interface IBidParticipantFilterInputProps extends INumInputProps {
  control: Control<any>;
  label: string;
  name: string;
  placeholder: string;
  error?: string;
}

const BidParticipantFilterInput: React.FC<IBidParticipantFilterInputProps> = ({
  label,
  ...rest
}) => {
  return (
    <div className="flex items-center mb-5">
      <InlineLabel labelWidth="192px" text={label} />

      <NumberInput className="md:w-full" {...rest} />
    </div>
  );
};
export default BidParticipantFilterInput;
