import PageLayout from "@components/layouts/page-layout";
import PostRequestForm from "@components/post-request-form";
import PostRequestNavigation from "@components/ui/post-request-navigation";
import { getMeData } from "@utils/auth-utils";
import { PAGE_NAME } from "@utils/constants";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "form"])),
    },
  };
};

const PostRequest = () => {
  const { company } = getMeData();
  const { t } = useTranslation("common");
  return (
    <>
      {/* Navbar here */}
      <div className="bg-white shadow-md md:mt-5 md:rounded-sm px-5 w-full">
        <p className="text-sm md:text-md text-gray-400 mb-7 pt-4">
          {t("post-request-paragraph")}
        </p>

        <PostRequestNavigation />

        <PostRequestForm />
      </div>
    </>
  );
};

PostRequest.Layout = PageLayout;
// Read page-layout everything will clear : used for navbar
PostRequest.PageName = PAGE_NAME.POST_REQUEST;

export default PostRequest;
