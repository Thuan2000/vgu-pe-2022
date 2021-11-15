import React from "react";
import cn from "classnames";
import { FontSize } from "@utils/interfaces";

interface ITypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?:
    | "normal"
    | "question"
    | "smallTitle"
    | "date"
    | "description"
    | "pageTitle";
  element?: "h6" | "h4" | "h3" | "h2" | "h1" | "p";
  color?: "primary" | "secondary-1";
  size?: FontSize;
  text: string;
}

const classesNames = {
  normal: "",
  question: "text-gray-200 text-md",
  smallTitle: "text-md font-semibold text-dark-blue",
  date: "text-md font-semibold text-secondary-1",
  description: "text-sm text-gray-400",
  pageTitle: "text-xl font-semibold",
};

const Typography: React.FC<ITypographyProps> = ({
  className: inputClassname,
  text,
  color,
  variant = "normal",
  size = "md",
  element: Element = "p",
  ...props
}) => {
  const classNames = cn(
    classesNames[variant],
    `text-${color}`,
    `text-${size}`,
    inputClassname
  );

  return (
    <Element className={classNames} {...props}>
      {text}
    </Element>
  );
};
export default Typography;
