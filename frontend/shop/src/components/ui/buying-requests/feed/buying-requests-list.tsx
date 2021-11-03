import { NetworkStatus } from "@apollo/client";
import { useDiscoveryBuyingRequestsQuery } from "@graphql/buying-request.graphql";
import { IBrStatus, IBuyingRequest } from "@graphql/types.graphql";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { brQueryParams } from "../query";
import BuyingRequestCard from "./buying-request-card";
import Loader from "@components/ui/storybook/loader/loader";

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

  const { data, fetchMore, loading, refetch, error, networkStatus } =
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
  const pagination = data?.discoveryBuyingRequests.pagination;
  const hasMore = pagination?.hasMore || false;
  const fetching = loading || networkStatus === NetworkStatus.fetchMore;

  function onLoadMore() {
    if (hasMore) setPage((old) => old + 1);
  }
  const [sentryRef] = useInfiniteScroll({
    loading: networkStatus === NetworkStatus.fetchMore,
    onLoadMore,
    disabled: !!error,
    hasNextPage: hasMore,
    rootMargin: "0px 0px 200px 0px",
  });

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
      {pagination?.hasMore && "MAN"}
      {(fetching || hasMore) && (
        <div ref={sentryRef} className="pt-2">
          <Loader spinnerOnly className="mt-4" />
        </div>
      )}
    </div>
  );
};
export default BuyingRequestsList;
