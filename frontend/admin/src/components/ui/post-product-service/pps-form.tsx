import { useRouter } from "next/dist/client/router";
import React from "react";
import PPSDescription from "./pps-description";
import PPSProductForm from "./pps-product-form";
import PPSServiceForm from "./pps-service/pps-service-form";
import PPSTargetSelector, { CreateTarget } from "./pps-target-selector";

interface IPostProductServiceFormProps {}

const PostProductServiceForm: React.FC<IPostProductServiceFormProps> = () => {
  const { query } = useRouter();

  const target = query.target as CreateTarget;
  const formPosition = parseInt(query.formPosition as string);

  return (
    <div className="space-y-2">
      {(!target || !formPosition || formPosition <= 1) && <PPSDescription />}
      {(!target || !formPosition || formPosition <= 1) && <PPSTargetSelector />}

      {target === "product" && <PPSProductForm />}
      {target === "service" && <PPSServiceForm />}
    </div>
  );
};
export default PostProductServiceForm;
