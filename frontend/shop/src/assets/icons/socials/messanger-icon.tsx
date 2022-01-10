import React from "react";
const MessangerIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.9979 0C10.4811 0 0 9.90512 0 23.2779C0 30.2733 2.86775 36.3208 7.53533 40.4964C7.9253 40.8444 8.16528 41.3363 8.17728 41.8643L8.30926 46.1359C8.35126 47.4978 9.75514 48.3857 11.003 47.8338L15.7666 45.7339C16.1686 45.554 16.6245 45.524 17.0505 45.638C19.2403 46.2379 21.5681 46.5619 23.9979 46.5619C37.5147 46.5619 47.9957 36.6567 47.9957 23.2839C47.9957 9.91112 37.5147 0 23.9979 0Z"
        fill="url(#paint0_radial_98309_537)"
      />
      <path
        d="M9.58715 30.0874L16.6365 18.9044C17.7584 17.1225 20.1582 16.6846 21.8441 17.9444L27.4536 22.1501C27.9695 22.534 28.6775 22.534 29.1874 22.1441L36.7587 16.3966C37.7667 15.6286 39.0865 16.8405 38.4146 17.9144L31.3592 29.0915C30.2373 30.8733 27.8375 31.3113 26.1517 30.0514L20.5422 25.8457C20.0262 25.4618 19.3183 25.4618 18.8083 25.8517L11.237 31.5992C10.2291 32.3672 8.90921 31.1613 9.58715 30.0874Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_98309_537"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(9.23918 47.7344) scale(52.2962)"
        >
          <stop stopColor="#0099FF" />
          <stop offset="0.6098" stopColor="#A033FF" />
          <stop offset="0.9348" stopColor="#FF5280" />
          <stop offset="1" stopColor="#FF7061" />
        </radialGradient>
      </defs>
    </svg>
  );
};
export default MessangerIcon;
