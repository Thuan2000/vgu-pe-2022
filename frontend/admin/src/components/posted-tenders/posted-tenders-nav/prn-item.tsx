import { useRouter } from "next/dist/client/router";
import React from "react";

interface IPostedRequestsNavItemProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  label: string;
  view: string;
  isActive?: boolean;
}

const PostedRequestsNavItem: React.FC<IPostedRequestsNavItemProps> = ({
  className,
  isActive,
  label,
  view,
  ...props
}) => {
  const { query, pathname, ...router } = useRouter();

  function navigateView() {
    router.replace({
      pathname,
      query: { ...query, view },
    });
  }

  return (
    <button onClick={navigateView} className="w-1/2.5 md:w-fit-content md:mr-5">
      <h3
        className={`text-center text-md pb-1 border-b-2 px-5 md:mb-5 ${
          isActive
            ? "text-primary border-primary"
            : "text-gray-200 border-gray-200"
        } ${className}`}
        {...props}
      >
        {label}
      </h3>
    </button>
  );
};
export default PostedRequestsNavItem;
