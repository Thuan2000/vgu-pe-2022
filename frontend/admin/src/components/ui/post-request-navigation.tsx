import UnderlineIcon from "@assets/icons/navigations/underline-icon";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";

const navs = [
  {
    label: "general-nav-label",
  },
  {
    label: "details-nav-label",
  },
  {
    label: "check-nav-label",
  },
];

const PostRequestNavigation: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { t } = useTranslation("form");
  const { query, ...router } = useRouter();

  const currentFormPosition = parseInt(query.formPosition as string) || 1;

  function setFormPosition(formPosition: number) {
    if (formPosition >= currentFormPosition) return;

    const { pathname } = router;
    router.push({
      pathname,
      query: {
        ...query,
        formPosition,
      },
    });
  }

  const navsUi = navs.map((nav, idx) => {
    const { label } = nav;
    const isActive = currentFormPosition === idx + 1;
    const extraClass = idx !== 0 && idx !== navs.length - 1 && "mx-4";

    return (
      <div
        key={label}
        className={`w-1/3 ${extraClass} ${
          currentFormPosition > idx + 1 ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => setFormPosition(idx + 1)}
      >
        <h3 className="sm:text-lg font-bold">
          {idx + 1}. {t(label)}
        </h3>
        <UnderlineIcon
          className="w-full"
          fill={currentFormPosition > idx + 1 ? "#B0BDC6" : ""}
          isActive={isActive}
        />
      </div>
    );
  });

  return <div className="flex">{navsUi}</div>;
};
export default PostRequestNavigation;
