import React from "react";
import cn from "classnames";

interface ITypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?:
    | "question"
    | "smallTitle"
    | "date"
    | "description"
    | "special-heading";
  element?: "h6" | "h4" | "h3" | "h2" | "h1" | "p";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  text: string;
}

const classesNames = {
  question: "text-gray-200 text-md",
  smallTitle: "text-md font-semibold text-dark-blue",
  date: "text-md font-semibold text-secondary-1",
  description: "text-sm text-gray-400",
  ["special-heading"]: "font-semibold text-xl text-dark-blue",
};

const Typography: React.FC<ITypographyProps> = ({
  className: inputClassname,
  text,
  variant,
  size = "md",
  element: Element = "p",
  ...props
}) => {
  const classNames = cn(
    {
      [classesNames.question]: variant === "question",
      [classesNames.smallTitle]: variant === "smallTitle",
      [classesNames.date]: variant === "date",
      [classesNames.description]: variant === "description",
      [classesNames["special-heading"]]: variant === "special-heading",
    },
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
