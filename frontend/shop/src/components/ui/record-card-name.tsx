import { isLogin as checkIsLogin } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import React from "react";
import Link from "./link";
import Typography from "./storybook/typography";

interface IRecordCardNameProps {
  title: string;
  href: string;
  isShouldLogin?: boolean;
}

const RecordCardName: React.FC<IRecordCardNameProps> = ({
  isShouldLogin,
  title,
  href,
}) => {
  const isLogin = checkIsLogin();

  return (
    <Link
      className={`border-b border-transparent 
    ${
      (isLogin || !isShouldLogin) &&
      "hover:border-black new-tab-link flex w-fit-content"
    }
    ${!isLogin && isShouldLogin && "pointer-events-none"}
  `}
      target="_blank"
      href={href}
      rel="noreferrer"
    >
      <Typography
        text={!isLogin && isShouldLogin ? "Please Login" : title}
        element="h3"
        size="sm"
      />
    </Link>
  );
};
export default RecordCardName;
