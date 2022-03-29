import { NetworkStatus } from "@apollo/client";
import PSListWrapper from "@components/layouts/ps-list-wrapper";
import NoRecordAnimation from "@components/ui/no-record-animation";
import Typography from "@components/ui/storybook/typography";
import { getCategoryByLabel } from "@datas/categories";
import { getIndustryByLabel } from "@datas/industries";
import { useProductsQuery } from "@graphql/product.graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loader from "../ui/storybook/loader/loader";
import ProductCard from "./product-card";

const SERVICES_LIMIT = 30;

const ProductsList: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);

  const { query } = useRouter();

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
  } = useProductsQuery({ variables: getProductsFetchInput() });
  const products = data?.products?.data || [];
  const hasMore = data?.products?.pagination?.hasMore || false;

  useEffect(() => {
    function getMoreBrs() {
      fetchMore({
        variables: getProductsFetchInput(),
      });
    }
    if (page > 0) getMoreBrs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function getProductsFetchInput() {
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
      refetch(getProductsFetchInput());
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

  if (!fetching && !products.length && !hasMore)
    return <NoRecordAnimation text={t("no-product-found-text")} />;

  return (
    <PSListWrapper>
      <div className={`grid grid-cols-4 gap-x-3 gap-y-5`}>
        {products.map((s) => {
          return (
            <ProductCard product={s as any} key={s?.id + "service-card"} />
          );
        })}
      </div>

      {(fetching || hasMore) && (
        <div ref={sentryRef} className="pt-2">
          <Loader spinnerOnly className="mt-4" />
        </div>
      )}
    </PSListWrapper>
  );
};
export default ProductsList;
