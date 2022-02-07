import PostRequestAnimationIcon from "@assets/icons/post-request-animation-icon";
import Link from "@components/ui/link";
import Typography from "@components/ui/storybook/typography";
import { ROUTES } from "@utils/routes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IHomepageChatProps {
  label: string;
  url: string;
  icon: any;
}

const HomepageChat: React.FC<IHomepageChatProps> = ({
  label,
  url,
  icon: Icon,
}) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  function chatWithUs() {
    let chatElement:HTMLElement = document.getElementsByClassName("woot-widget-bubble woot-elements--right")[0] as HTMLElement;
    chatElement.click()
  }

  return (
    <Link
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border border-gray-100 rounded-sm fic justify-between p-10 cursor-pointer"
    >
      <div className={`space-y-2`}>
        <p className="font-bold text-semibold text-3xl mb-4">{t("what-can-we-help-you")} </p>
        
        <div
          className={`fic space-x-1 transition-all duration-100`}
          style={{
            width: isHovered ? 160 : 156,
          }}
          onClick={chatWithUs}
        >
            <p className="gray-400">{t("lets-chat-text")}</p>
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
export default HomepageChat;
