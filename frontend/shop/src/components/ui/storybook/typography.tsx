import React from "react";
import cn from "classnames";
import { TSize } from "@utils/interfaces";

type TextColor =
  | "primary"
  | "dark-blue"
  | "gray"
  | "gray-400"
  | "black"
  | "secondary-1"
  | "white";

type TFontWeight = "bold" | "semibold" | "light" | "normal";

interface ITypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?:
    | "question"
    | "smallTitle"
    | "title"
    | "postedDate"
    | "date"
    | "description"
    | "BRTitle"
    | "relatedCompanyName"
    | "special-heading"
    | "title"
    | "bigTitle"
    | "homepageSectionTitle"
    | "pageTitle";
  element?: "h6" | "h4" | "h3" | "h2" | "h1" | "p";
  weight?: TFontWeight;
  size?: TSize;
  text: string;
  isHaveReadMore?: boolean;
  color?: TextColor;
  align?: "left" | "center" | "right";
  readMoreText?: string;
  truncate?: boolean;
  onReadMore?: () => void;
}

const classesNames = {
  question: "text-gray-200",
  smallTitle: "font-semibold text-dark-blue",
  title: "font-semibold text-xl",
  date: "font-semibold text-secondary-1",
  description: "text-sm text-gray-400",
  homepageSectionTitle: "text-[24pt] font-bold text-center text-dark-blue",
  BRTitle: "text-lg font-semibold text-black",
  relatedCompanyName: "font-semibold text-gray",
  bigTitle: "text-xl font-semibold text-dark-blue",
  pageTitle: "text-xl font-semibold",
  postedDate: "text-sm text-gray font-light",
  ["special-heading"]: "font-semibold text-xl text-dark-blue",
};

const Typography: React.FC<ITypographyProps> = ({
  className: inputClassname,
  text,
  variant,
  weight = "",
  color,
  size = "sm",
  element: Element = "p",
  readMoreText = "View more",
  onReadMore,
  truncate,
  isHaveReadMore,
  ...props
}) => {
  const classNames = cn(
    !!variant && classesNames[variant],
    `${(weight === "bold" || weight === "semibold") && "text-dark-blue"}`,
    `text-${size}`,
    `text-${color}`,
    `font-${weight}`,
    !!truncate && "truncate",
    inputClassname
  );

  return (
    <Element className={classNames} {...props}>
      {text}
      {!!isHaveReadMore && (
        <span
          className="text-secondary-1 underline font-semibold ml-1 cursor-pointer"
          onClick={onReadMore}
        >
          {readMoreText}
        </span>
      )}
    </Element>
  );
};
export default Typography;
