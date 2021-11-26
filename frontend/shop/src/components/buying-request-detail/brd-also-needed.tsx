import Typography from "@components/ui/storybook/typography";
import { useDiscoveryBuyingRequestsQuery } from "@graphql/buying-request.graphql";
import { useTranslation } from "next-i18next";
import React from "react";

import { useRouter } from "next/dist/client/router";
import { IBuyingRequest } from "@graphql/types.graphql";
import BRDAlsoNeededItem from "./brd-also-needed-item";

interface IBRDAlsoNeededProps {
  brReference: IBuyingRequest;
}

const ALSO_NEEDED_BR_LIMIT = 5;

const BRDAlsoNeeded: React.FC<IBRDAlsoNeededProps> = ({ brReference }) => {
  const { t } = useTranslation("common");
  const { data } = useDiscoveryBuyingRequestsQuery({
    variables: {
      input: {
        companyId: brReference.company.id,
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
        {brs &&
          brs?.map((br) => {
            if (slug === br?.slug) return;
            return (
              <BRDAlsoNeededItem
                key={br?.id + "also-needed-ber"}
                br={br as IBuyingRequest}
              />
            );
          })}
      </div>
    </div>
  );
};
export default BRDAlsoNeeded;
