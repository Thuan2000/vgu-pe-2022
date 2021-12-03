import React from "react";
import cn from "classnames";
import Typography from "./typography";
import { COLORS } from "@utils/colors";

interface IChipProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: "primary" | "secondary-1" | "error";
  text: string;
  icon?: React.FC<React.SVGAttributes<{}>>;
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
  icon: Icon,
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
      {!!Icon && <Icon className="mr-1 w-3 h-3" fill={COLORS.WHITE} />}
      <Typography className="!text-xs text-white" text={text} />
    </div>
  );
};
export default Chip;
