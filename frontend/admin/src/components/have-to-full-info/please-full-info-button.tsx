import { getCompanySlug } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import React from "react";
import Swal from "sweetalert2";
import Button from "../ui/storybook/button";

interface IPleaseEditCompanyButtonProps {
  text?: string;
  disabled?: boolean;
}

const PleaseEditCompanyButton: React.FC<IPleaseEditCompanyButtonProps> = ({
  text,
  disabled,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  async function handleClick() {
    const { isConfirmed } = await Swal.fire({
      icon: "info",
      title: t("to-edit-company-page-title"),
      text: "to-edit-company-page-text",
      confirmButtonText: "to-edit-company-page-button-label",
    });

    if (isConfirmed) {
      router.push(`/${getCompanySlug()}/edit`);
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
        {!!text ? text : t("please-edit-company-button-text")}
      </Button>
    </>
  );
};
export default PleaseEditCompanyButton;
