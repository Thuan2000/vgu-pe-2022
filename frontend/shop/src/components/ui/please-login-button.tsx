import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import React from "react";
import Swal from "sweetalert2";
import Link from "./link";
import Button from "./storybook/button";

interface IPleaseLoginButtonProps {
  text?: string;
  disabled?: boolean;
}

const PleaseLoginButton: React.FC<IPleaseLoginButtonProps> = ({
  text,
  disabled,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  async function handleClick() {
    const { isConfirmed } = await Swal.fire({
      icon: "info",
      title: t("to-login-page-title"),
      text: "to-login-page-text",
      confirmButtonText: "to-login-page-button-label",
      showCloseButton: true,
    });

    if (isConfirmed) {
      router.push(ROUTES.LOGIN);
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        className={`flex`}
        size="small"
        color="primary"
        disabled={disabled}
      >
        {!!text ? text : t("please-login-button-text")}
      </Button>
    </>
  );
};
export default PleaseLoginButton;
