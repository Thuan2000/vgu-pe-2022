import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";

interface ILogoProps extends React.AnchorHTMLAttributes<{}> {
	size?: "big" | "medium" | "small";
}

const sizes = {
	big: {
		width: 200,
		height: 100
	},
	medium: {
		width: 160,
		height: 37
	},
	small: {
		width: 100,
		height: 50
	}
};

const Logo = ({ className, size, ...props }: ILogoProps) => {
	return (
		<Link
			href={siteSettings.logo.href}
			className={cn("inline-flex", className)}
			{...props}
		>
			<span
				className="overflow-hidden relative"
				style={{
					width: size ? sizes[size].width : siteSettings.logo.width,
					height: size ? sizes[size].height : siteSettings.logo.height
				}}
			>
				<Image
					src={siteSettings.logo.url}
					alt={siteSettings.appName ?? siteSettings.logo.alt}
					layout="fill"
					objectFit="contain"
					loading="eager"
				/>
			</span>
		</Link>
	);
};

export default Logo;
