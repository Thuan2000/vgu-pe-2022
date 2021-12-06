import React from "react";
import cn from "classnames";
import Typography from "./typography";
import { COLORS } from "@utils/colors";

interface IChipProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: "primary" | "secondary-1" | "error" | "white";
  textColor?: "white" | "black" | "gray-400";
  text: string;
  icon?: React.FC<React.SVGAttributes<{}>>;
}

const classesNames = {
  root: "rounded-3xl text-white font-semibold px-4 flex-center",
  border: "border border-black",
  error: "bg-error",
};

const Chip: React.FC<IChipProps> = ({
  background = "primary",
  textColor = "white",
  text,
  className: inputClass,
  icon: Icon,
  ...props
}) => {
  const className = cn(
    classesNames.root,
    {
      [classesNames["error"]]: background === "error",
      [classesNames["border"]]: background === "white",
    },
    `bg-${background}`,
    `text-${textColor}`,
    inputClass
  );

  return (
    <div className={className} {...props}>
      {!!Icon && <Icon className="mr-1 w-3 h-3" fill={COLORS.WHITE} />}
      <Typography className={`!text-xs fic text-${textColor}`} text={text} />
    </div>
  );
};
export default Chip;
