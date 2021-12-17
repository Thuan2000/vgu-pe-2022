import HomeIcon from "@assets/icons/navigations/home-icon";
import UpVIcon from "@assets/icons/up-v-icon";
import { COLORS } from "@utils/colors";
import { toCamelCaseFromSnakeCase } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "../link";
import Typography from "./typography";

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
      <Typography
        className={`text-gray-300 whitespace-nowrap text-md flex-shrink-0 
          ${isLast && "!text-primary px-2 border-2 border-primary rounded-sm"}
          ${!isLast && "h-[22px]"}
        `}
        text={label}
      />
    );
  }

  const links = generateLinks();

  return (
    <div {...props}>
      <div className="fic space-x-1 w-fit-content px-5 pt-2">
        {links.length >= 1 ? (
          <Link href={homeHref}>
            <Item label={t("homepage-breadcrumb")} />
            {/* <HomeIcon fill={COLORS.GRAY[200]} className="w-6 h-6" /> */}
          </Link>
        ) : (
          <div className="fic">
            <HomeIcon className="w-6 h-6 mr-2" />
            <Item label={t("homepage-breadcrumb")} />
          </div>
        )}
        {links.map((p, idx) => {
          const isLast = idx === paths.length - 1;
          return (
            <>
              <UpVIcon className="rotate-90 w-3 h-3" />
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
