import Loading from "@components/ui/loading";
import { useProjectQuery } from "@graphql/project.graphql";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

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

const EditProjectPage: React.FC<IEditProjectPageProps> = ({ slug }) => {
  const { data, loading } = useProjectQuery({ variables: { slug } });

  if (loading) return <Loading />;

  return <div>Mantul</div>;
};
export default EditProjectPage;
