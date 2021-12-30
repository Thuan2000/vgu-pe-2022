import PostRequestAnimationIcon from "@assets/icons/post-request-animation-icon";
import Link from "@components/ui/link";
import Typography from "@components/ui/storybook/typography";
import { ROUTES } from "@utils/routes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IHomepageMenuItemProps {
  label: string;
  url: string;
  icon: any;
}

const HomepageMenuItem: React.FC<IHomepageMenuItemProps> = ({
  label,
  url,
  icon: Icon,
}) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border border-gray-100 rounded-sm fic justify-between p-4 cursor-pointer"
    >
      <div className={`space-y-2`}>
        <Typography text={label} variant="smallTitle" size="lg" />
        <div
          className={`fic space-x-1 justify-between transition-all duration-100`}
          style={{
            width: isHovered ? 83 : 80,
          }}
        >
          <Typography
            text={t("lets-start-text")}
            size="sm"
            color={"gray-400"}
          />
          <Typography
            text={"›"}
            className={`translate-y-[-2px]`}
            size="xl"
            color={"gray-400"}
          />
        </div>
      </div>
      <Icon
        className={`transition-transform duration-100 ${
          isHovered && "-rotate-12 scale-110"
        }`}
      />
    </Link>
  );
};
export default HomepageMenuItem;
