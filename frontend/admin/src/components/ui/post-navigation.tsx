import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef } from "react";
import PostNavigationItem from "./post-navigation-item";

export interface INav {
  label: string;
  getIsActive?: (label: string) => boolean;
  getIsFilled?: (label: string) => boolean;
  onClick?: (label: string) => void;
}

interface IPostNavigation {
  navs: INav[];
}

const PostNavigation: React.FC<IPostNavigation> = ({ navs }) => {
  const { query, ...router } = useRouter();
  const isReached = useRef(0);

  const currentFormPosition = parseInt(query.formPosition as string) || 1;

  useEffect(() => {
    if (isReached.current < currentFormPosition)
      isReached.current = currentFormPosition;
  }, [currentFormPosition]);

  function setFormPosition(formPosition: number) {
    if (formPosition >= currentFormPosition && isReached.current < formPosition)
      return;

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
    const { label, getIsActive, getIsFilled, onClick } = nav;
    const isActive = getIsActive
      ? getIsActive(label)
      : currentFormPosition === idx + 1;
    const isFilled = getIsFilled
      ? getIsFilled(label)
      : currentFormPosition > idx + 1;
    const extraClass = idx !== navs.length - 1 ? "mr-2" : "";

    return (
      <PostNavigationItem
        key={label}
        onClick={() => (onClick ? onClick(label) : setFormPosition(idx + 1))}
        currentFormPosition={currentFormPosition}
        idx={idx}
        navigateAble={!!onClick || isReached.current >= idx + 1}
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
