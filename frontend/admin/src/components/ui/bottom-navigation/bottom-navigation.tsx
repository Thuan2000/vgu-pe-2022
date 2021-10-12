import { COLORS } from "@utils/colors";
import { navigations } from "@utils/navigations";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "../link";

interface IPhoneBottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BottomNavigation: React.FC<IPhoneBottomNavigationProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation("common");
  const [activeIdx, setActiveIdx] = useState(0);
  const navs = navigations.map((nav, idx) => {
    const { href, label, icon: Icon } = nav;
    const isActive = idx === activeIdx;
    return (
      <Link href={href} key={href + label} onClick={() => setActiveIdx(idx)}>
        <div className="flex flex-col items-center justify-end w-20">
          <Icon
            className="w-6 h-5"
            fill={COLORS.GRAY.DEFAULT}
            isActive={isActive}
          />
          <p className={`text-xs text-gray ${isActive && "text-primary"}`}>
            {t(label)}
          </p>
        </div>
      </Link>
    );
  });

  return (
    <div
      className="fixed bottom-0 flex items-end justify-between w-full py-3 bg-white z-50"
      style={{ boxShadow: "0 0 10px rgba(0,0,0,.3)" }}
    >
      {navs}
    </div>
  );
};
export default BottomNavigation;
