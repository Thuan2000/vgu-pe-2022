import React from "react";
import PostNavigation from "./ui/post-navigation";

interface IPostPageWrapperProps {
  navs: any[];
}

const PostPageWrapper: React.FC<IPostPageWrapperProps> = ({
  children,
  navs,
}) => {
  return (
    <div>
      <div className="px-5">
        <PostNavigation navs={navs} />
      </div>
      <div className="bg-white shadow-md md:rounded-sm border-t-2 translate-y-[-2px] border-primary px-5 py-6 mb-5">
        {children}
      </div>
    </div>
  );
};
export default PostPageWrapper;
