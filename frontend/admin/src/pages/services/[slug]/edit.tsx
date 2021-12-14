import { initApollo } from "@utils/apollo";
import { ServiceDocument } from "@graphql/service.graphql";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import PPSServiceForm from "@components/ui/post-product-service/pps-service/pps-service-form";
import { IService } from "@components/ui/storybook/inputs/group-pricing-input/gpi-service-form";
import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import { postProductNavs } from "@components/ui/post-product-service/pps-contstants";

interface IEditServiceProps {
  service: IService;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const slug = params?.slug;

  const apollo = initApollo();
  const { data } = await apollo.query({
    query: ServiceDocument,
    variables: {
      slug,
    },
  });

  const service = data.service;

  return {
    props: {
      service,
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "category",
        "industry",
      ])),
    },
  };
};

const EditService: React.FC<IEditServiceProps> = ({ service }) => {
  return (
    <div>
      <PostPageWrapper navs={postProductNavs}>
        <PPSServiceForm initValue={service as any} />
      </PostPageWrapper>
    </div>
  );
};

(EditService as any).Layout = PageLayout;

export default EditService;
