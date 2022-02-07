import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { signIn, useSession } from "next-auth/client";

import Button, { ButtonProps } from "./ui/storybook/button";
import FacebookIcon from "@assets/icons/socials/facebook-icon";
import GoogleIcon from "@assets/icons/socials/google-icon";

export interface ISocialButtonProps extends ButtonProps {
  social: "google" | "facebook";
  label?: string;
}

const classes = {
  root: "text-xs font-semibold text-dark-blue flex-center border rounded-md border-gray-200 hover:shadow-md transition-shadow duration-100",
};

const SocialLoginButton = ({
  label,
  social,
  className,
  ...props
}: ISocialButtonProps) => {
  const classesName = cn(classes.root, className);

  function handleClick() {}

  return (
    <button
      variant="outline"
      className={classesName}
      {...props}
      onClick={handleClick}
    >
      {social === "facebook" && <FacebookIcon className="w-6 mr-2" />}
      {social === "google" && <GoogleIcon className="w-6 mr-2" />}
      {label}
    </button>
  );
};
export default SocialLoginButton;
