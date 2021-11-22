import PageLayout from "@components/layouts/page-layout";
import PostTenderForm from "@components/post-tender-form";
import Loading from "@components/ui/loading";
import PostNavigation from "@components/ui/post-navigation";
import { useBuyingRequestBySlugQuery } from "@graphql/buying-request.graphql";
import { IBuyingRequest } from "@graphql/types.graphql";
import { postRequestNavs } from "@pages/post-tender";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";

interface IEditProjectPageProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "form"])),
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
    <div className="bg-white shadow-md md:mt-5 md:rounded-sm px-5 w-full">
      <p className="text-sm md:text-md text-gray-400 mb-7 pt-4">
        {t("post-request-paragraph")}
      </p>

      <PostNavigation navs={postRequestNavs} />

      <PostTenderForm initValue={buyingRequest as IBuyingRequest} />
    </div>
  );
};
export default EditBuyingRequestPage;

(EditBuyingRequestPage as any).Layout = PageLayout;
(EditBuyingRequestPage as any).PageName = "editRequest-page-name";
