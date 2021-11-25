import Typography from "@components/ui/storybook/typography";
import { useDiscoveryBuyingRequestsQuery } from "@graphql/buying-request.graphql";
import { useTranslation } from "next-i18next";
import React from "react";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import Chip from "@components/ui/storybook/chip";
import { trimText, viDateFormat } from "@utils/functions";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";

interface IBRDAlsoNeededProps {}

const ALSO_NEEDED_BR_LIMIT = 5;

const BRDAlsoNeeded: React.FC<IBRDAlsoNeededProps> = ({}) => {
  const { t } = useTranslation("common");
  const { data } = useDiscoveryBuyingRequestsQuery({
    variables: {
      input: {
        offset: 0,
        limit: ALSO_NEEDED_BR_LIMIT,
      },
    },
  });

  const slug = useRouter().query.slug;

  const brs = data?.discoveryBuyingRequests.data;

  return (
    <div className="flex-shrink-0 space-y-2">
      <Typography
        size="lg"
        variant="smallTitle"
        text={t("alsoNeededByCompany-title")}
      />
      <div className="space-y-4">
        {brs?.map((br) => {
          if (slug === br?.slug) return;
          return (
            <div
              key={br?.id + "also-needed-ber"}
              className="flex flex-col items-center border p-2 rounded-md"
            >
              <div className="relative h-32 w-32">
                <Image
                  src={br?.gallery?.at(0)?.location || siteSettings.logo.url}
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
                  <Chip text={t(br?.status || "")} />
                </div>
                <div className="fic space-x-1">
                  <Typography
                    variant="question"
                    text={`${t("posted-date-text")}:`}
                  />
                  <Typography
                    variant="question"
                    text={viDateFormat(br?.endDate)}
                  />
                </div>

                <Typography
                  className="w-48"
                  variant="description"
                  text={trimText(br?.description || "", 50) || ""}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BRDAlsoNeeded;
