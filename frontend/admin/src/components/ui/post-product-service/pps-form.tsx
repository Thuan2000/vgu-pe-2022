import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "../storybook/typography";
import PPSDescription from "./pps-description";
import PPSProductForm from "./pps-product-form";
import PPSServiceForm from "./pps-service/pps-service-form";
import PPSTargetSelector, { CreateTarget } from "./pps-target-selector";

interface IPostProductServiceFormProps {}

const PostProductServiceForm: React.FC<IPostProductServiceFormProps> = () => {
  const { t } = useTranslation("form");
  const { query } = useRouter();

  const target = query.target as CreateTarget;
  const formPosition = parseInt(query.formPosition as string);

  return (
    <div className="space-y-2">
      {(!target || !formPosition || formPosition <= 1) && <PPSDescription />}
      {(!target || !formPosition || formPosition <= 1) && <PPSTargetSelector />}

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
  );
};
export default PostProductServiceForm;
