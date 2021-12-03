import { IBuyingRequest } from "@graphql/types.graphql";
import React from "react";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import Chip from "@components/ui/storybook/chip";
import { trimText, viDateFormat } from "@utils/functions";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import Typography from "@components/ui/storybook/typography";

interface IBRDAlsoNeededItemProps {
  br: IBuyingRequest;
}

const BRDAlsoNeededItem: React.FC<IBRDAlsoNeededItemProps> = ({ br }) => {
  const { t } = useTranslation("common");

  return (
    <div className={`flex flex-col items-center border p-2 rounded-md`}>
      <div className="relative h-32 w-32">
        <Image
          src={br?.gallery?.at(0)?.url || siteSettings.logo.url}
          layout="fill"
        />
      </div>

      <div className="w-full items-start space-y-1">
        <Link href={`${ROUTES.TENDERS}/${br?.slug}`}>
          <Typography
            variant="smallTitle"
            className="cursor-pointer"
            text={trimText(br?.name || "", 25) || ""}
          />
        </Link>
        <div className="fic space-x-1">
          <Chip text={br?.location || ""} background="secondary-1" />
          <Chip
            text={t(br?.status || "")}
            background={br?.status === "CLOSE" ? "error" : "primary"}
          />
        </div>
        <div className="fic space-x-1">
          <Typography variant="question" text={`${t("posted-date-text")}:`} />
          <Typography variant="question" text={viDateFormat(br?.endDate)} />
        </div>

        <Typography
          className="w-48"
          variant="description"
          text={trimText(br?.description || "", 50) || ""}
        />
      </div>
    </div>
  );
};
export default BRDAlsoNeededItem;
