import { NetworkStatus } from "@apollo/client";
import { useServicesQuery } from "@graphql/service.graphql";
import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loader from "../ui/storybook/loader/loader";
import ServiceCard from "./service-card";

const SERVICES_LIMIT = 30;

interface IServicesListProps {}

const ServicesList: React.FC<IServicesListProps> = ({}) => {
  const [page, setPage] = useState<number>(0);
  const {
    data,
    loading: fetching,
    networkStatus,
    error,
    fetchMore,
  } = useServicesQuery({ variables: getServiceFetchInput() });
  const services = data?.services.services || [];
  const hasMore = data?.services.pagination.hasMore || false;

  useEffect(() => {
    function getMoreBrs() {
      fetchMore({
        variables: getServiceFetchInput(),
      });
    }
    if (page > 0) getMoreBrs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function getServiceFetchInput() {
    return {
      input: { offset: getOffset(page), limit: SERVICES_LIMIT },
    };
  }

  function getOffset(page: number) {
    return page * SERVICES_LIMIT;
  }

  const [sentryRef] = useInfiniteScroll({
    loading: networkStatus === NetworkStatus.fetchMore,
    onLoadMore,
    disabled: !!error,
    hasNextPage: hasMore,
    rootMargin: "0px 0px 200px 0px",
  });

  function onLoadMore() {
    if (hasMore) setPage((old) => old + 1);
  }

  return (
    <div className={`grid grid-cols-4 gap-x-10 gap-y-5 w-full`}>
      {services.map((s) => {
        return <ServiceCard service={s as any} key={s?.id + "service-card"} />;
      })}

      {(fetching || hasMore) && (
        <div ref={sentryRef} className="pt-2">
          <Loader spinnerOnly className="mt-4" />
        </div>
      )}
    </div>
  );
};
export default ServicesList;
