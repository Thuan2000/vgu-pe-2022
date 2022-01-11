import { IFile } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import React from "react";
import Link from "../link";
import { getDocumentPreview } from "../storybook/document-uploader/du-thumb";
import Typography from "../storybook/typography";

interface ICDRequestsProps {}

const CDRequests: React.FC<ICDRequestsProps> = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography
        variant="smallTitle"
        element="h3"
        size="md"
        text={t("companyRequests-title")}
        className="mb-5"
      />
      <div className="grid grid-col-3">
        <div className={`mr-5 col-start-1 border p-3 rounded-md space-y-1`}>
          <div className="mb-5 mt-2">
            <Typography
              variant="smallTitle"
              element="h3"
              size="md"
              text={t("hihi")}
              className="mb-2"
            />
          </div>
          
          
        </div>
        <div className={`mr-5 col-start-2 border p-3 rounded-md space-y-1`}>
          <div className="mb-5 mt-2">
            <Typography
              variant="smallTitle"
              element="h3"
              size="md"
              text={t("hihi")}
              className="mb-2"
            />
          </div>
          
          
        </div>
        <div className={`col-start-3 border p-3 rounded-md space-y-1`}>
          <div className="mb-5 mt-2">
            <Typography
              variant="smallTitle"
              element="h3"
              size="md"
              text={t("hihi")}
              className="mb-2"
            />
          </div>
          
          
          
        </div>
      </div>
      
    </div>

  );
};
export default CDRequests;
