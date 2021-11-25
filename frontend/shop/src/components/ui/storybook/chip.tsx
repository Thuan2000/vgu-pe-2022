import React from "react";
import cn from "classnames";
import Typography from "./typography";

interface IChipProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: "primary" | "secondary-1" | "error";
  text: string;
}

const classesNames = {
  root: "rounded-3xl text-white font-semibold px-4 flex-center",
  primary: "bg-primary",
  "secondary-1": "bg-secondary-1",
  error: "bg-error",
};

const Chip: React.FC<IChipProps> = ({
  background = "primary",
  text,
  className: inputClass,
  ...props
}) => {
  const className = cn(
    classesNames.root,
    {
      [classesNames.primary]: background === "primary",
      [classesNames["secondary-1"]]: background === "secondary-1",
      [classesNames["error"]]: background === "error",
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
