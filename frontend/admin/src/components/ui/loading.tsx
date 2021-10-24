import React from "react";
import { useTranslation } from "react-i18next";
import Loader from "./storybook/loader/loader";

const Loading: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen">
      <Loader />
    </div>
  );
};
export default Loading;
