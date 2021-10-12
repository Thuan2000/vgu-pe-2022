import DocumentAddIcon from "@assets/icons/document-add-icon";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import { ROUTES } from "@utils/routes";
import React from "react";
import { useTranslation } from "react-i18next";

const NoBuyingRequests: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className="bg-white md:py-10 rounded-sm md:rounded-lg py-10">
      <div className="font-semibold flex-center flex-col">
        <p className="mb-5">{t("no-buying-request-yet-text-info")}</p>
        <Link href={ROUTES.POST_REQUEST}>
          <Button>
            <DocumentAddIcon className="mr-2" />
            {t("create-post-button-label")}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NoBuyingRequests;
