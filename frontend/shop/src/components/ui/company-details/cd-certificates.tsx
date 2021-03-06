import { IFile } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import React from "react";
import Link from "../link";
import { getDocumentPreview } from "../storybook/document-uploader/du-thumb";
import Typography from "../storybook/typography";

interface ICDCertificatesProps {
  certificates: IFile[];
}

const CDCertificates: React.FC<ICDCertificatesProps> = ({ certificates }) => {
  const { t } = useTranslation();
  return (
    <div className={`space-y-1 relative border-1 rounded-sm p-3`}>
      <Typography
        variant="smallTitle"
        element="h3"
        size="md"
        text={t("companyCertificates-title")}
      />
      <div className={`grid grid-cols-2 pt-4`}>
        {!!certificates?.length ? (
          certificates?.slice(0, 2).map((c) => {
            return (
              // <div key={c.url} className={`relative w-24 h-24`}>
              <Link key={c.url} href={c.url} target={"_blank"} rel="noreferrer">
                {getDocumentPreview(c, { width: 200, height: 120 })}
              </Link>
              // </div>
            );
          })
        ) : (
          <div className={`flex-center h-full w-full py-10 col-span-3`}>
            <Typography text={t("no-certificates")} size="md" />
          </div>
        )}
      </div>
    </div>
  );
};
export default CDCertificates;
