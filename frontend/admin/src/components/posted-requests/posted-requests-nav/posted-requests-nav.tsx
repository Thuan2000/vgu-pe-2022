import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { POSTED_REQUEST_VIEWS, navs } from "./prn-constants";
import PostedRequestsNavItem from "./prn-item";

interface IPostedRequestsNavProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PostedRequestsNav: React.FC<IPostedRequestsNavProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation("common");

  const { query } = useRouter();

  const navsDom = navs.map((nav, idx) => {
    return (
      <PostedRequestsNavItem
        view={nav.view}
        isActive={
          nav.view === (query.view || POSTED_REQUEST_VIEWS.BUYING_REQUESTS)
        }
        label={t(nav.label)}
        key={nav.view + nav.label}
      />
    );
  });

  return (
    <div
      className={`flex items-center justify-between md:justify-start border-b-1 border-gray-10 px-4 ${className}`}
      {...props}
    >
      {navsDom}
    </div>
  );
};
export default PostedRequestsNav;
