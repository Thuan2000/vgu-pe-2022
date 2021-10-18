import BuyingRequestHeader from "@components/posted-requests/buying-request/brc-header";
import BuyingRequestCard from "@components/posted-requests/buying-request/buying-request-card";
import PostedRequestsNav from "@components/posted-requests/posted-requests-nav";
import Loading from "@components/ui/loading";
import Pagination from "@components/ui/pagination";
import { useBuyingRequestsAndCountQuery } from "@graphql/buying-request.graphql";
import { IBuyingRequest } from "@graphql/types.graphql";
import { getMeData } from "@utils/auth-utils";
import { BUYING_REQUESTS_GET_LIMIT } from "@utils/constants";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import {
  BuyingRequestContextProvider,
  useBRContext,
} from "src/contexts/buying-request.context";
import NoBuyingRequests from "@components/posted-requests/no-buying-requests";
import CreateProject from "@components/create-project";

interface IBuyingRequestsProps extends React.HTMLAttributes<HTMLDivElement> {}

function getParameter(companyId: number, offset: number) {
  return { variables: { companyId, offset } };
}

const BuyingRequests: React.FC<IBuyingRequestsProps> = ({
  className,
  ...props
}) => {
  const { query, ...router } = useRouter();
  const activePageIdx = parseInt((query?.page as string) || "1");
  const { company } = getMeData();
  const companyId = company?.id as number;

  const { shouldRefetchBrs } = useBRContext();
  const { data, loading, fetchMore, refetch } = useBuyingRequestsAndCountQuery({
    ...getParameter(companyId, getOffset()),
  });

  useEffect(() => {
    fetchMore({
      ...getParameter(companyId, getOffset()),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePageIdx, company?.id]);

  useEffect(() => {
    refetch({ companyId, offset: getOffset() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefetchBrs]);

  function handlePageChange(newIdx: number) {
    const { pathname } = router;

    router.replace({
      pathname,
      query: { ...query, page: newIdx },
    });
  }

  function getOffset() {
    return (activePageIdx - 1) * BUYING_REQUESTS_GET_LIMIT;
  }

  const totalBRs = data?.buyingRequestsAndCount.totalDataCount;

  if (loading) return <Loading />;

  if (!data?.buyingRequestsAndCount.buyingRequests.length)
    return <NoBuyingRequests />;
  const brs = data?.buyingRequestsAndCount.buyingRequests as IBuyingRequest[];

  const brChips = brs?.map((br: IBuyingRequest) => {
    if (!br) return;
    return (
      <BuyingRequestCard
        br={br}
        key={br?.name + br?.endDate + ""}
        className="mb-3"
      />
    );
  });

  return (
    <>
      <BuyingRequestContextProvider>
        <CreateProject />
        <BuyingRequestHeader brs={brs} />
        <div className="mt-4 mx-4 md:flex flex-wrap justify-between">
          {brChips}
        </div>
        <Pagination
          align="end"
          activeIdx={activePageIdx}
          onChangePage={handlePageChange}
          totalCount={totalBRs || 1}
          color="gray-200"
          activeColor="primary"
          displayPageAmount={5}
          limit={BUYING_REQUESTS_GET_LIMIT}
        />
      </BuyingRequestContextProvider>
    </>
  );
};
export default BuyingRequests;
