import { NetworkStatus } from "@apollo/client";
import PSListWrapper from "@components/layouts/ps-list-wrapper";
import Typography from "@components/ui/storybook/typography";
import { getCategoryByLabel } from "@datas/categories";
import { getIndustryByLabel } from "@datas/industries";
import { useProductsQuery } from "@graphql/product.graphql";
import { useServicesQuery } from "@graphql/service.graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loader from "../ui/storybook/loader/loader";
import ProductCard from "./product-card";

const SERVICES_LIMIT = 30;

interface IProductListProps {}

const ProductsList: React.FC<IProductListProps> = ({}) => {
  const { t } = useTranslation();
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

  if (!fetching && !products.length)
    return (
      <Typography
        className={`w-full text-2xl`}
        align="center"
        text={t("no-products-yet-message")}
      />
    );

  return (
    <PSListWrapper>
      {products.map((s) => {
        return <ProductCard product={s as any} key={s?.id + "service-card"} />;
      })}

      {(fetching || hasMore) && (
        <div ref={sentryRef} className="pt-2">
          <Loader spinnerOnly className="mt-4" />
        </div>
      )}
    </PSListWrapper>
  );
};
export default ProductsList;
