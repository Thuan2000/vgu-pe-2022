import { NetworkStatus } from "@apollo/client";
import Button from "@components/ui/storybook/button";
import { useDiscoveryBuyingRequestsQuery } from "@graphql/buying-request.graphql";
import { IBrStatus, IBuyingRequest } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";

import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { brQueryParams } from "../query";
import BuyingRequestCard from "./buying-request-card";

const BRS_LIMIT = 2;

function getOffset(page: number) {
  return page * BRS_LIMIT;
}

const BuyingRequestsList: React.FC<React.HTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  const { query } = useRouter();

  const searchValue = query.name as string;
  const location = query.location as string;
  const productName = query.productName as string;
  const industryId = parseInt(query.industry + "");
  const status = query.status as IBrStatus;
  const minBudget = query.minBudget as string;
  const maxBudget = query.maxBudget as string;

  const [page, setPage] = useState<number>(0);

  const { data, fetchMore, refetch, networkStatus } =
    useDiscoveryBuyingRequestsQuery(
      brQueryParams({
        offset: getOffset(page),
        industryId,
        status,
        minBudget,
        maxBudget,
        productName,
        location,
        searchValue,
        limit: BRS_LIMIT,
      }) as any
    );

  const brs = data?.discoveryBuyingRequests.data;
  const dataCount = data?.discoveryBuyingRequests.totalDataCount as number;

  useEffect(() => {
    function getMoreBrs() {
      fetchMore({
        variables: brQueryParams({
          offset: getOffset(page),
          limit: BRS_LIMIT,
        }) as any,
      });
    }

    if (page > 0) getMoreBrs();
  }, [page]);

  useEffect(() => {
    refetch({
      input: {
        searchValue,
        location,
        productName,
        industryId,
        status,
        minBudget,
        maxBudget,
        offset: getOffset(0),
        limit: BRS_LIMIT,
      },
    } as any);
    setPage(0);
  }, [
    searchValue,
    location,
    productName,
    industryId,
    status,
    minBudget,
    maxBudget,
  ]);

  return (
    <div {...props}>
      {brs &&
        brs.map((br) => {
          return (
            <BuyingRequestCard
              br={br as IBuyingRequest}
              key={br?.id + "br-card"}
            />
          );
        })}
      {(brs?.length as number) < dataCount && (
        <Button
          loading={networkStatus === NetworkStatus.fetchMore}
          onClick={() => setPage((old) => ++old)}
        >
          Fetch More
        </Button>
      )}
    </div>
  );
};
export default BuyingRequestsList;
