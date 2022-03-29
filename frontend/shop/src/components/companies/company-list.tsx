import React, { useEffect, useState } from "react";
import { useCompaniesQuery } from "@graphql/company.graphql";
import { useTranslation } from "next-i18next";
import CompanyCard from "./company-card";
import { useRouter } from "next/router";
import { getIndustryByLabel } from "@datas/industries";
import { NetworkStatus } from "@apollo/client";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loader from "@components/ui/storybook/loader/loader";
import { viFormatDateToOriginalDate } from "@utils/functions";
import NoRecordAnimation from "@components/ui/no-record-animation";

interface ICompanyListProps {}

const COMPANIES_LIMIT = 1;

const CompanyList: React.FC<ICompanyListProps> = ({}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);

  const { query } = useRouter();

  const searchValue = query.name as string;
  const location = query.location as string;
  const establishment = query.establishment as string;
  const industryId = parseInt(
    getIndustryByLabel(query.industry as string)?.id + ""
  );

  function getOffset(page: number) {
    return page * COMPANIES_LIMIT;
  }

  const {
    data,
    refetch,
    fetchMore,
    networkStatus,
    error,
    loading: fetching,
  } = useCompaniesQuery({
    variables: getServiceFetchInput(),
  });
  const companies = data?.companies?.companies;
  const hasMore = data?.companies?.pagination?.hasMore;

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
        limit: COMPANIES_LIMIT,
        ...(searchValue ? { searchValue } : {}),
        ...(location ? { location } : {}),
        ...(industryId ? { industryId } : {}),
        ...(establishment
          ? {
              establishmentDate:
                viFormatDateToOriginalDate(establishment).getTime(),
            }
          : {}),
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
  }, [searchValue, location, industryId, establishment]);

  const [sentryRef] = useInfiniteScroll({
    loading: networkStatus === NetworkStatus.fetchMore,
    onLoadMore,
    disabled: !!error,
    hasNextPage: hasMore || false,
    rootMargin: "0px 0px 200px 0px",
  });

  function onLoadMore() {
    if (hasMore) setPage((old) => old + 1);
  }

  if (!fetching && !companies?.length && !hasMore)
    return <NoRecordAnimation text={t("no-buying-request-found-text")} />;

  return (
    <main className={`mt-4 w-full space-y-4`}>
      {companies?.map((c) => {
        return <CompanyCard key={"company-list" + c.id} company={c as any} />;
      })}
      {(fetching || hasMore) && (
        <div ref={sentryRef} className="pt-2">
          <Loader spinnerOnly className="mt-4" />
        </div>
      )}
    </main>
  );
};

export default CompanyList;
