import PageLayout from "@components/layouts/page-layout";
import {
  BuyingRequestDocument,
  DiscoveryBuyingRequestsDocument,
  DiscoveryBuyingRequestsQuery,
} from "@graphql/buying-request.graphql";
import { IBuyingRequest, ICompany } from "@graphql/types.graphql";
import { APOLLO_STATE_NAME, initApollo } from "@utils/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import useIsPhone from "src/hooks/isPhone.hook";
import PleaseOpenOnLaptop from "@components/please-open-on-laptop";
import NeedToLoginWrapper from "@components/need-to-login-wrapper";
import { isLogin } from "@utils/auth-utils";
import TenderDetail from "@components/ui/buying-requests/tender-detail";
import { firePleaseLoginSwal } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface IBuyingRequestDetailProps {
  br: IBuyingRequest;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // export const getStaticPaths: any = async (ctx: any) => {
  const { locales } = ctx;
  const apolloClient = initApollo();
  const { data } = await apolloClient.query({
    query: DiscoveryBuyingRequestsDocument,
    variables: {
      input: {
        offset: 0,
        limit: 1000,
      },
    },
  });

  const brs = (data as DiscoveryBuyingRequestsQuery).discoveryBuyingRequests
    .data;

  const paths = brs?.flatMap((product: any) =>
    locales?.map((locale: any) => ({ params: { slug: product.slug }, locale }))
  );

  return { paths: paths as any, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug;

  const apolloClient = initApollo();
  const {
    data: { buyingRequestBySlug: br },
  } = await apolloClient.query({
    query: BuyingRequestDocument,
    variables: { slug },
  });

  if (!br)
    return {
      notFound: true,
    };

  return {
    props: {
      br,
      [APOLLO_STATE_NAME]: apolloClient.cache.extract(),
      revalidate: 60,
      ...(await serverSideTranslations(locale!, [
        "common",
        "industry",
        "category",
        "form",
        "business-type",
      ])),
    },
  };
};

const BuyingRequestDetail: React.FC<IBuyingRequestDetailProps> = ({ br }) => {
  const { t } = useTranslation("common");

  const isPhone = useIsPhone();

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = isLogin();
    async function fireSwal() {
      if (isLoggedIn) return;

      // The cancel button and confirm button is swapped
      const { isDenied } = await firePleaseLoginSwal(t, Swal);
      if (isDenied) router.replace(ROUTES.LOGIN);
      else router.replace(ROUTES.HOMEPAGE);
    }

    fireSwal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPhone) return <PleaseOpenOnLaptop />;

  return (
    <>
      <Head>
        <title>{generateHeadTitle(br.name)}</title>
        <meta name="description" content={br.description || ""} />
      </Head>

      {/* {!isLogin() ? (
        <NeedToLoginWrapper> */}
      <TenderDetail br={br} />
      {/* </NeedToLoginWrapper> */}
      {/* ) : (
        <TenderDetail br={br} />
      )} */}
    </>
  );
};

(BuyingRequestDetail as any).Layout = PageLayout;

export default BuyingRequestDetail;
