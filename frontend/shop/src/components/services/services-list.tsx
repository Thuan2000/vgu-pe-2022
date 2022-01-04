import { NetworkStatus } from "@apollo/client";
import { getCategoryByLabel } from "@datas/categories";
import { getIndustryByLabel } from "@datas/industries";
import { useServicesQuery } from "@graphql/service.graphql";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loader from "../ui/storybook/loader/loader";
import ServiceCard from "./service-card";

const SERVICES_LIMIT = 30;

interface IServicesListProps {}

const ServicesList: React.FC<IServicesListProps> = ({}) => {
  const [page, setPage] = useState<number>(0);

  const { query, ...router } = useRouter();

  const searchValue = query.name as string;
  const location = query.location as string;
  const industryId = parseInt(
    getIndustryByLabel(query.industry as string)?.id + ""
  );
  const categoryId = parseInt(
    getCategoryByLabel(query.category as string)?.id + ""
  );
  const minBudget = query.minBudget as string;
  const maxBudget = query.maxBudget as string;

  const {
    data,
    loading: fetching,
    networkStatus,
    error,
    fetchMore,
    refetch,
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
      input: {
        offset: getOffset(page),
        limit: SERVICES_LIMIT,
        ...(searchValue ? { searchValue } : {}),
        ...(location ? { location } : {}),
        ...(industryId ? { industryId } : {}),
        ...(minBudget ? { minBudget } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(maxBudget ? { maxBudget } : {}),
      },
    };
  }

  useEffect(() => {
    function reFetch() {
      refetch(getServiceFetchInput());
    }
    if (data) reFetch();
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, location, industryId, categoryId, minBudget, maxBudget]);

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