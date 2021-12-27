import Typography from "@components/ui/storybook/typography";
import { useUnapprovedQuery } from "@graphql/super-admin.graphql";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import DocIcon from "@assets/icons/files/doc-icon";
import ExcelIcon from "@assets/icons/files/excel-icon";
import PdfIcon from "@assets/icons/files/pdf-icon";
import { IFile } from "@graphql/types.graphql";
import Link from "@components/ui/link";
import AvatarIcon from "@assets/icons/avatar-icon";
import UnapprovedCompanyCard from "./unapproved-company-card";

interface IUnapprovedListProps {}

export function getDocumentPreview(file: IFile, props?: any) {
  const { fileName } = file as any;
  const extension = fileName?.split(".").pop()?.toLocaleLowerCase();
  const size = 40;
  if (extension?.includes("pdf"))
    return <PdfIcon width={size} height={size} {...props} />;
  else if (extension?.includes("csv") || extension?.includes("xls"))
    return <ExcelIcon width={size} height={size} {...props} />;
  else if (extension?.includes("csv") || extension?.includes("doc"))
    return <DocIcon width={size} height={size} {...props} />;
}

const UnapprovedList: React.FC<IUnapprovedListProps> = ({}) => {
  const { t } = useTranslation();

  const { data, refetch } = useUnapprovedQuery({ variables: { input: {} } });

  const companies = data?.unapprovedCompanies;

  function handleApproved() {
    refetch({ input: {} });
  }

  return (
    <div className={`bg-white w-full p-5`}>
      <div className="space-y-5">
        {!!companies?.length ? (
          companies?.map((comp) => {
            return (
              <UnapprovedCompanyCard
                onApproved={handleApproved}
                company={comp as any}
              />
            );
          })
        ) : (
          <Typography
            align="center"
            variant="bigTitle"
            text={t("no-unapproved-companies")}
          />
        )}
      </div>
    </div>
  );
};
export default UnapprovedList;
