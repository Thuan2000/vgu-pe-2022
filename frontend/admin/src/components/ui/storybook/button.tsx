import { BuyingRequestPartsFragmentDoc } from "@graphql/buying-request.graphql";
import { Background } from "@utils/interfaces";
import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "normal" | "outline" | "custom" | "cancel";
  size?: "big" | "medium" | "small" | "fluid";
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  color?: Background;
}

const classes = {
  root: (color: Background) =>
    `inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow-lg focus:ring-1 focus:ring-${color}-700 active:bg-${color}-active`,
  normal: (color: Background) =>
    `bg-${color} text-light border border-transparent hover:bg-${color}-hover`,
  cancel: "bg-transparent text-gray border border-gray",
  custom: "border border-transparent",
  outline: (color: Background) =>
    `border border-${color} bg-transparent hover:text-light hover:bg-${color} hover:border-${color} text-${color}`,
  loading:
    "ml-2 h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin",
  disabled:
    "border border-border-base bg-gray-300 border-border-400 cursor-not-allowed text-white",
  disabledOutline: "border border-border-base text-muted cursor-not-allowed",
  small: "px-3 py-0 h-9 text-sm h-10",
  medium: "px-5 py-0 h-12",
  big: "px-10 py-0 h-14",
  fluid: "px-20 h-9 text-sm",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "normal",
      size = "small",
      children,
      active,
      loading = false,
      disabled = false,
      type,
      color = "primary",
      ...rest
    } = props;
    const classesName = cn(
      classes.root(color),
      {
        [classes.normal(color)]: !disabled && variant === "normal",
        [classes.disabled]: disabled && variant === "normal",
        [classes.outline(color)]: !disabled && variant === "outline",
        [classes.disabledOutline]: disabled && variant === "outline",
        [classes.cancel]: !disabled && variant === "cancel",
        [classes.small]: size === "small",
        [classes.medium]: size === "medium",
        [classes.big]: size === "big",
        [classes.fluid]: size === "fluid",
      },
      className
    );

    return (
      <button
        aria-pressed={active}
        data-variant={variant}
        ref={ref}
        disabled={disabled}
        className={classesName}
        type={type || "button"}
        {...rest}
      >
        {children}
        {loading && (
          <span
            className={classes.loading}
            style={{
              borderTopColor:
                variant === "outline" ? "currentColor" : "#ffffff",
            }}
          />
        )}
      </button>
    );
  }
);

export default Button;
