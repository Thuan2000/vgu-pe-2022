import { useRouter } from "next/dist/client/router";
import React from "react";
import SettingNavigationItem from "./setting-navigation-item";


export interface INav {
  label: string;
  getIsActive?: (label: string) => boolean;
  getIsFilled?: (label: string) => boolean;
  onClick?: (label: string) => void;
}

interface ISettingNavigation {
  navs: INav[];
}

const SettingNavigation: React.FC<ISettingNavigation> = ({ navs }) => {
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
    const { label, getIsActive, getIsFilled, onClick } = nav;
    const isActive = getIsActive
      ? getIsActive(label)
      : currentFormPosition === idx + 1;
    const isFilled = getIsFilled
      ? getIsFilled(label)
      : currentFormPosition > idx + 1;
    const extraClass = idx !== navs.length - 1 ? "mr-2" : "";

    return (
      <SettingNavigationItem
        key={label}
        onClick={() => (onClick ? onClick(label) : setFormPosition(idx + 1))}
        currentFormPosition={currentFormPosition}
        idx={idx}
        navigateAble={!!onClick}
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
export default SettingNavigation;
