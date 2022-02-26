import React from "react";
import PostNavigation, { INav } from "./ui/post-navigation";

interface IPostPageWrapperProps {
  navs: INav[];
  noXPadding?: boolean;
}

const PostPageWrapper: React.FC<IPostPageWrapperProps> = ({
  children,
  navs,
  noXPadding,
}) => {
  return (
    <>
      <div className={"px-5"}>
        <PostNavigation navs={navs} />
      </div>
      <div
        className={`bg-white shadow-md md:rounded-sm border-t-2 translate-y-[-2px] border-primary py-6 mb-5 ${
          !noXPadding ? "px-5" : ""
        } `}
      >
        {children}
      </div>
    </>
  );
};
export default PostPageWrapper;
