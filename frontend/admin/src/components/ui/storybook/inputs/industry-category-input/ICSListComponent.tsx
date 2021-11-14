import UpVIcon from "@assets/icons/up-v-icon";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

interface IICSListComponentProps {
  isActive?: boolean;
  onClick?: () => void;
  label: string;
  hasChildren?: boolean;
}

const ICSListComponent: React.FC<IICSListComponentProps> = ({
  isActive,
  hasChildren,
  label,
  ...props
}) => {
  return (
    <li
      className={`p-2 flex items-center justify-between rounded-sm cursor-pointer
    ${isActive && "bg-primary bg-opacity-12"}
  `}
      {...props}
    >
      <span>{label}</span>
      {hasChildren && <UpVIcon className="rotate-90" />}
    </li>
  );
};
export default ICSListComponent;
