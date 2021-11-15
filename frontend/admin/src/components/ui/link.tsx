import { AnchorHTMLAttributes } from "react";
import cn from "classnames";
import NextLink from "next/link";

interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isActive?: boolean;
  noDecoration?: boolean;
  className?: string;
}

const classes = {
  root: "text-sm active:text-primary-active transition-colors duration-200",
};

const Link: React.FC<ILinkProps> = ({
  href,
  children,
  isActive,
  className,
  noDecoration,
  ...props
}) => {
  const classesName = cn(classes.root, className);

  return (
    <NextLink href={href}>
      <a className={classesName} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
