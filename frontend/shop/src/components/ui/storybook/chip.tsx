import React from "react";
import cn from "classnames";
import Typography from "./typography";

interface IChipProps extends React.HTMLAttributes<HTMLDivElement> {
  background: "primary" | "secondary-1";
  text: string;
}

const classesNames = {
  root: "rounded-3xl text-white font-semibold px-4 flex-center",
  primary: "bg-primary",
  "secondary-1": "bg-secondary-1",
};

const Chip: React.FC<IChipProps> = ({
  background,
  text,
  className: inputClass,
  ...props
}) => {
  const className = cn(
    classesNames.root,
    {
      [classesNames.primary]: background === "primary",
      [classesNames["secondary-1"]]: background === "secondary-1",
    },
    inputClass
  );

  return (
    <div className={className} {...props}>
      <Typography className="!text-xs text-white" text={text} />
    </div>
  );
};
export default Chip;
