import { useRouter } from "next/dist/client/router";
import React from "react";
import PostNavigationItem from "./post-navigation-item";

interface INav {
  label: string;
}

interface IPostNavigation {
  navs: INav[];
}

const PostNavigation: React.FC<IPostNavigation> = ({ navs }) => {
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
    const isFilled = currentFormPosition > idx + 1;
    const extraClass = idx !== 0 && idx !== navs.length - 1 ? "mx-2" : "";

    return (
      <PostNavigationItem
        key={label}
        onClick={() => setFormPosition(idx + 1)}
        currentFormPosition={currentFormPosition}
        idx={idx}
        label={label}
        isFilled={isFilled}
        isActive={isActive}
        extraClass={extraClass}
      />
    );
  });

  return (
    <div className={`hidden sm:flex`}>
      <div className="flex">{navsUi}</div>
    </div>
  );
};
export default PostNavigation;
