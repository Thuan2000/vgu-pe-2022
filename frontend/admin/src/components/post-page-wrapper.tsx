import React from "react";

interface IPostPageWrapperProps {}

const PostPageWrapper: React.FC<IPostPageWrapperProps> = ({ children }) => {
  return (
    <div className="bg-white shadow-md md:my-[38px] border-t-2 border-primary md:rounded-sm px-5 w-full relative py-4">
      {children}
    </div>
  );
};
export default PostPageWrapper;
