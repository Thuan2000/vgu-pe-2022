import HomeIcon from "@assets/icons/navigations/home-icon";
import { COLORS } from "@utils/colors";
import { toCamelCaseFromSnakeCase } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "../link";

interface IBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  homeHref: string;
  // paths: IPath[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ homeHref, ...props }) => {
  const { t } = useTranslation();
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
        label: toCamelCaseFromSnakeCase(t(`${p}`)),
        href: `/${p}`,
      };
    });
  }

  function Item({
    label,
    isLast,
    isChevron,
  }: {
    label: string;
    isLast?: boolean;
    isChevron?: boolean;
  }) {
    return (
      <p
        className={`text-primary whitespace-nowrap flex-shrink-0 text-${
          isChevron ? "lg" : "xs"
        } ${isLast && "!text-black"}`}
      >
        {label}
      </p>
    );
  }

  const links = generateLinks();

  return (
    <div {...props}>
      <div className="border border-primary rounded-sm bg-gray-10 py-1 fic space-x-1 w-fit-content px-5">
        {links.length >= 1 ? (
          <Link href={homeHref}>
            <HomeIcon fill={COLORS.PRIMARY.DEFAULT} className="w-5 h-5" />
          </Link>
        ) : (
          <div className="fic">
            <HomeIcon className="w-5 h-5 mr-2" />
            <Item label={t("homepage-breadcrumb")} isLast />
          </div>
        )}
        {links.map((p, idx) => {
          const isLast = idx === paths.length - 1;
          return (
            <>
              <Item isChevron label="›" isLast />
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
