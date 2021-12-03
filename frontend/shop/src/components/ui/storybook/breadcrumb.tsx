import HomeIcon from "@assets/icons/navigations/home-icon";
import { COLORS } from "@utils/colors";
import { setCharAt, toCamelCase } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Link from "../link";

// @TODO : make this customizeable
interface IPath {
  label: string;
  href: string;
}

interface IBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  homeHref: string;
  // paths: IPath[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ homeHref, ...props }) => {
  const { pathname, query } = useRouter();
  const paths = pathname.split("/").slice(1);
  const lastPath = paths[paths.length - 1];

  if (lastPath[0] === "[" && lastPath[lastPath.length - 1] === "]") {
    paths[paths.length - 1] = query[
      lastPath.replace("[", "").replace("]", "")
    ] as string;
  }

  function generateLinks() {
    return paths.flatMap((p) => {
      if (p === "") return [];
      return {
        label: toCamelCase(p),
        href: `/${p}`,
      };
    });
  }

  function Item({ label, isLast }: { label: string; isLast?: boolean }) {
    return (
      <span
        className={`text-primary flex-shrink-0 text-sm ${
          isLast && "!text-gray"
        }`}
      >
        {label}
      </span>
    );
  }

  const links = generateLinks();

  return (
    <div {...props}>
      <div className="flex items-center space-x-1 w-fit-content px-5">
        {links.length >= 1 ? (
          <Link href={homeHref}>
            <HomeIcon fill={COLORS.PRIMARY.DEFAULT} className="w-5 h-5" />
          </Link>
        ) : (
          <HomeIcon className="w-5 h-5" />
        )}
        {links.map((p, idx) => {
          const isLast = idx === paths.length - 1;
          return (
            <>
              <Item label=">" isLast={isLast} />
              {!isLast ? (
                <Link href={p.href}>
                  <Item label={p.label} />
                </Link>
              ) : (
                <Item isLast label={p.label} />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Breadcrumb;
