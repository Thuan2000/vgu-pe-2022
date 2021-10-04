import UnderlineIcon from "@assets/icons/navigations/underline-icon";
import { useRouter } from "next/dist/client/router";
import React from "react";

const navs = [
  {
    label: "General",
  },
  {
    label: "Details",
  },
  {
    label: "Check",
  },
];

const PostRequestNavigation: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
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
        className={`w-24 md:w-1/3 ${extraClass}`}
        onClick={() => setFormPosition(idx + 1)}
      >
        <h4 className="md:text-md">
          {idx + 1}. {label}
        </h4>
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
