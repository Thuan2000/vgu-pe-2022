import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "../storybook/typography";
import PPSDescription from "./pps-description";
import PPSProductForm from "./pps-product/pps-product-form";
import PPSServiceForm from "./pps-service/pps-service-form";
import PPSTargetSelector, { CreateTarget } from "./pps-target-selector";

interface IPostProductServiceFormProps {}

const PostProductServiceForm: React.FC<IPostProductServiceFormProps> = () => {
  const { t } = useTranslation("form");
  const { query } = useRouter();

  const target = query.target as CreateTarget;
  const formPosition = parseInt(query.formPosition as string);

  return (
    <div>
      <div
        className={`space-y-2 ${
          !target
            ? "bg-white shadow-md md:rounded-sm border-t-2 translate-y-[-2px] border-primary py-6 mb-5 px-5"
            : ""
        }`}
      >
        {!target && <PPSDescription />}
        {!target && <PPSTargetSelector />}

        {!target && (
          <div className="py-5">
            <Typography
              text={t("pleaseChoose-pps-target")}
              align="center"
              variant="bigTitle"
            />
          </div>
        )}
        {target === "product" && <PPSProductForm />}
        {target === "service" && <PPSServiceForm />}
      </div>
    </div>
  );
};
export default PostProductServiceForm;
