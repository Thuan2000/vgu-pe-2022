import UnderlineIcon from "@assets/icons/navigations/underline-icon";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import useIsPhone from "src/hooks/isPhone.hook";
import NumberLabel from "./storybook/inputs/queue-number";

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

const PostRequestNavigation: React.FC = () => {
  const { t } = useTranslation("form");
  const { query, ...router } = useRouter();
  const isPhone = useIsPhone();

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
        className={`px-10 bg-white py-1 rounded-t-md ${extraClass} border-2 flex-center
          ${currentFormPosition > idx + 1 ? "cursor-pointer" : "cursor-default"}
          ${
            isActive
              ? "border-primary border-b-transparent"
              : "border-b-primary"
          }
        `}
        onClick={() => setFormPosition(idx + 1)}
      >
        <h3 className="text-center sm:text-md font-bold flex items-center">
          <NumberLabel
            backgroundColor="primary"
            className="mr-3 !w-5 !h-5"
            number={idx + 1}
          />
          {t(label)}
        </h3>
      </div>
    );
  });

  return (
    <div className={`absolute bottom-full ${isPhone && "hidden"}`}>
      <div className="flex">{navsUi}</div>
    </div>
  );
};
export default PostRequestNavigation;
