import React from "react";
import cn from "classnames";

interface ITypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?:
    | "question"
    | "smallTitle"
    | "title"
    | "date"
    | "description"
    | "special-heading";
  element?: "h6" | "h4" | "h3" | "h2" | "h1" | "p";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  text: string;
}

const classesNames = {
  question: "text-gray-200",
  smallTitle: "font-semibold text-dark-blue",
  title: "font-semibold text-xl",
  date: "font-semibold text-secondary-1",
  description: "text-sm text-gray-400",
  ["special-heading"]: "font-semibold text-xl text-dark-blue",
};

const Typography: React.FC<ITypographyProps> = ({
  className: inputClassname,
  text,
  variant,
  size = "sm",
  element: Element = "p",
  ...props
}) => {
  const classNames = cn(
    variant && classesNames[variant],
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
