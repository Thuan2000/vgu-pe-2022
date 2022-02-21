import React from "react";
import cn from "classnames";
import Typography from "./typography";
import { COLORS } from "@utils/colors";
import { TSize } from "@utils/interfaces";

interface IChipProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: "primary" | "secondary-1" | "error" | "transparent";
  textColor?: "white" | "black" | "gray-400";
  text: string;
  icon?: React.FC<React.SVGAttributes<{}>>;
  size?: TSize;
}

const classesNames = {
  root: "rounded-3xl text-white font-semibold px-4 flex-center flex-shrink-0",
  error: "bg-error border border-error",
  primary: "bg-primary border border-primary",
  ["secondary-1"]: "bg-secondary-1 border border-secondary-1",
  transparent: "bg-transparent border border-black",
};

const Chip: React.FC<IChipProps> = ({
  background = "primary",
  textColor = "white",
  text,
  className: inputClass,
  icon: Icon,
  size = "xs",
  ...props
}) => {
  const className = cn(
    classesNames.root,
    {
      [classesNames["error"]]: background === "error",
      [classesNames["transparent"]]: background === "transparent",
      [classesNames["secondary-1"]]: background === "secondary-1",
      [classesNames["primary"]]: background === "primary",
      [classesNames["error"]]: background === "error",
    },
    inputClass
  );

  return (
    <div className={className} {...props}>
      {!!Icon && <Icon className="mr-1 w-3 h-3" fill={COLORS.WHITE} />}
      <Typography
        className={`!text-${size} fic text-${textColor}`}
        text={text}
        weight="normal"
      />
    </div>
  );
};
export default Chip;
