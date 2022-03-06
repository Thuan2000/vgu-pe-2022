import HomeIcon from "@assets/icons/navigations/home-icon";
import { COLORS } from "@utils/colors";
import { toCamelCaseFromSnakeCase } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "@components/ui/link";
import Typography from "./ui/storybook/typography";
import ArrowLeftIcon from "@assets/icons/arrow-left-icon";
import UpVIcon from "@assets/icons/up-v-icon";

interface IBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  homeHref: string;
  // paths: IPath[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ homeHref, ...props }) => {
  const { t } = useTranslation();
  const { pathname, query } = useRouter();
  const paths = pathname.split("/").slice(1);
  const lastPath = paths[paths.length - 1];

  if (lastPath === "edit") {
    paths[paths.length - 2] = query[
      paths[paths.length - 2].replace("[", "").replace("]", "")
    ] as string;
  }

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
  }: {
    label: string;
    isLast?: boolean;
    isChevron?: boolean;
  }) {
    return (
      <Typography
        className={`text-primary whitespace-nowrap text-md flex-shrink-0 h-[22px]
        } ${isLast && "!text-gray-300"}`}
        text={label}
      />
    );
  }

  const links = generateLinks();

  return (
    <div {...props}>
      <div className="py-1 flex items-baseline space-x-1 w-fit-content pl-2">
        {links.length >= 1 ? (
          <Link href={homeHref}>
            <Item label={t("homepage-breadcrumb")} />
            {/* <HomeIcon fill={COLORS.PRIMARY.DEFAULT} className="w-6 h-6" /> */}
          </Link>
        ) : (
          <div className="flex items-baseline space-x-2">
            <HomeIcon className="w-5 h-5 mr-2" />
            <Item label={t("homepage-breadcrumb")} isLast />
          </div>
        )}
        {links.map((p, idx) => {
          const isLast = idx === paths.length - 1;
          return (
            <div
              key={p.href + p.label}
              className={`flex items-baseline space-x-2`}
            >
              <UpVIcon
                className="rotate-90 w-3 h-3"
                fill={COLORS.PRIMARY.DEFAULT}
              />
              {!isLast ? (
                <Link href={p.href}>
                  <Item label={p.label} />
                </Link>
              ) : (
                <Item isLast label={p.label} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Breadcrumb;
