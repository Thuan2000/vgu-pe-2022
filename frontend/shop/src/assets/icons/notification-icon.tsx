import React from "react";
const NotificationIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.14614 1.24812C7.4433 0.516158 8.16138 0 9 0C9.83863 0 10.5567 0.516158 10.8539 1.24812C13.8202 2.06072 16 4.77579 16 8V12.6972L17.8321 15.4453C18.0366 15.7522 18.0557 16.1467 17.8817 16.4719C17.7077 16.797 17.3688 17 17 17H12.4646C12.2219 18.6961 10.7632 20 9 20C7.23677 20 5.77806 18.6961 5.53545 17H1C0.631206 17 0.292346 16.797 0.118327 16.4719C-0.0556921 16.1467 -0.0366195 15.7522 0.167951 15.4453L2 12.6972V8C2 4.77579 4.17983 2.06072 7.14614 1.24812ZM7.58535 17C7.79127 17.5826 8.34689 18 9 18C9.65311 18 10.2087 17.5826 10.4146 17H7.58535ZM9 3C6.23858 3 4 5.23858 4 8V13C4 13.1974 3.94156 13.3904 3.83205 13.5547L2.86852 15H15.1315L14.168 13.5547C14.0584 13.3904 14 13.1974 14 13V8C14 5.23858 11.7614 3 9 3Z"
        fill={fill || "#B0BDC6"}
      />
    </svg>
  );
};
export default NotificationIcon;
