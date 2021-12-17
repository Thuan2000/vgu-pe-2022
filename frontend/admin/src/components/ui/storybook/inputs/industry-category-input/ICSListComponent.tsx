import UpVIcon from "@assets/icons/up-v-icon";
import { FontSize } from "@utils/interfaces";
import React from "react";

interface IICSListComponentProps {
  isActive?: boolean;
  onClick?: () => void;
  label: string;
  hasChildren?: boolean;
  textSize: FontSize;
}

const ICSListComponent: React.FC<IICSListComponentProps> = ({
  isActive,
  hasChildren,
  label,
  textSize,
  ...props
}) => {
  return (
    <li
      className={`p-2 text-${textSize} flex items-center justify-between rounded-sm cursor-pointer
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
