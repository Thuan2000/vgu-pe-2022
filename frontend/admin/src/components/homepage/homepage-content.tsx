import ArrowLeftIcon from "@assets/icons/arrow-left-icon";
import PostProductIcon from "@assets/icons/post-product-icon";
import PostRequestAnimationIcon from "@assets/icons/post-request-animation-icon";
import PostServiceIcon from "@assets/icons/post-service-icon";
import UnderDevelopment from "@components/under-development";
import { getLoggedInUser } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import React from "react";
import { useTranslation } from "react-i18next";
import HomepageMenuItem from "./homepage-menu-item";
import HomepageReview from "./homepage-review";
import HomepageSubcription from "./homepage-subcription";
import HomepageChat from "./homepage-chat-now";

interface IHomepageContentProps {}

const HomepageContent: React.FC<IHomepageContentProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-white p-6 rounded-sm`}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className={`space-y-4`}>
          <HomepageMenuItem
            label={t("post-tender-label")}
            url={ROUTES.POST_REQUEST}
            icon={PostRequestAnimationIcon}
          />
          <HomepageMenuItem
            label={t("post-product-label")}
            url={`${ROUTES.POST_PRODUCT_SERVICE}?target=product`}
            icon={PostProductIcon}
          />
          <HomepageMenuItem
            label={t("post-service-label")}
            url={`${ROUTES.POST_PRODUCT_SERVICE}?target=service`}
            icon={PostServiceIcon}
          />
        </div>
        <div>
          {/*Account review and next payment bla bla bla*/}
          <div className="grid grid-rows-2 gap-y-4">
            <HomepageReview
              label={t("account-review-label")}
              userName={`${getLoggedInUser()?.firstName} ${
                getLoggedInUser()?.lastName
              }`}
              userEmail={t(getLoggedInUser()?.email || "")}
              userRole={t(getLoggedInUser()?.role || "")}
            />
            <HomepageSubcription
              label={t("subcription")}
            />
          </div>
        </div>
        
      </div>
      <div className={`space-y-4 mt-5`}>
          <HomepageChat
            label={t("chat-now-label")}
            url=""
            icon={PostRequestAnimationIcon}
          />
          
        </div>
    </div>
  );
};
export default HomepageContent;
