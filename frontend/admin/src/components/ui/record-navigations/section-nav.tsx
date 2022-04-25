import React from "react";

interface ISectionNavProps {
  onClick: () => void;
  isActive: boolean;
  label: string;
}

const SectionNav: React.FC<ISectionNavProps> = ({
  isActive,
  label,
  onClick,
}) => {
  return (
    <li
      className={`border-l-2 pl-3
      ${isActive && "border-primary text-primary"}
    `}
    >
      <button type="button" className={`truncate`} onClick={onClick}>
        {label}
      </button>
    </li>
  );
};

export default SectionNav;
