import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	isActive?: boolean;
	noDecoration?: boolean;
}

const Link: React.FC<ILinkProps> = ({
	href,
	children,
	isActive,
	className,
	noDecoration,
	...props
}) => {
	const classesName = `${noDecoration ? "" : "link"} ${className} ${
		isActive ? "text-green-main" : ""
	}`;

	return (
		<NextLink href={href}>
			<a className={classesName} {...props}>
				{children}
			</a>
		</NextLink>
	);
};

export default Link;
