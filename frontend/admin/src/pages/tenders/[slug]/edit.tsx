import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import PostTenderForm from "@components/post-tender-form";
import Loading from "@components/ui/loading";
import { useBuyingRequestBySlugQuery } from "@graphql/buying-request.graphql";
import { IBuyingRequest } from "@graphql/types.graphql";
import { postRequestNavs } from "@pages/post-tender";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

interface IEditProjectPageProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "source-type",
        "category",
        "industry",
      ])),
      ...query,
    },
  };
};

const EditBuyingRequestPage: React.FC<IEditProjectPageProps> = ({ slug }) => {
  const { t } = useTranslation();

  const { data, loading } = useBuyingRequestBySlugQuery({
    variables: { slug },
  });

  const buyingRequest = data?.buyingRequestBySlug;

  if (loading) return <Loading />;
  return (
    <>
      <Head>
        <title>{generateHeadTitle(buyingRequest?.name as string)}</title>
        <meta
          name="description"
          content={buyingRequest?.description as string}
        />
      </Head>
      <PostPageWrapper navs={postRequestNavs}>
        <p className="text-sm md:text-md text-gray-400 mb-7 pt-4">
          {t("post-request-paragraph")}
        </p>
        <PostTenderForm initValue={buyingRequest as IBuyingRequest} />
      </PostPageWrapper>
    </>
  );
};
export default EditBuyingRequestPage;

(EditBuyingRequestPage as any).Layout = PageLayout;
(EditBuyingRequestPage as any).PageName = "editRequest-page-name";
