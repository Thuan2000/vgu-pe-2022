import BRDAlsoNeeded from "@components/buying-request-detail/brd-also-needed";
import BRDAskQuestion from "@components/buying-request-detail/brd-ask-question";
import BRDDescription from "@components/buying-request-detail/brd-desc";
import BRDDetail from "@components/buying-request-detail/brd-detail";
import BRDDiscussion from "@components/buying-request-detail/brd-discussion";
import BRDName from "@components/buying-request-detail/brd-name";
import BRDPrice from "@components/buying-request-detail/brd-price";
import RecordCompanySummary from "@components/record-detail/record-company-summary";
import { IBuyingRequest } from "@graphql/types.graphql";
import { isLogin } from "@utils/auth-utils";
import { getCompanyId, viDateFormat } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import DetailImages from "../detail-image-section";

interface ITenderDetailProps {
  br: IBuyingRequest;
}

const TenderDetail: React.FC<ITenderDetailProps> = ({ br }) => {
  const { t } = useTranslation();

  const [reload, setReload] = useState(false);
  const isMyBr = br.company?.id === getCompanyId();

  function refetchDiscussions() {
    setReload(!reload);
  }

  return (
    <div className="flex space-x-7 justify-between">
      <div className="pb-10 w-full">
        <div className="flex space-x-4">
          {/* Left Section */}
          <div>
            <DetailImages
              coverImage={br?.coverImage!}
              images={br.gallery || []}
            />
          </div>
          {/* Right section */}
          <div className="w-full">
            <BRDName
              name={`${t("requestNamePrefix-value")} - ${
                !isLogin ? "Please Login" : br.name
              }`}
              companyName={!isLogin ? "Please Login" : br.company?.name!}
              createdAt={viDateFormat(br.createdAt)}
              status={br.status}
            />
            <BRDPrice
              minBudget={br.minBudget}
              maxBudget={br.maxBudget}
              minOrder={br.minOrder}
              unit={br.unit}
              endDate={br.endDate}
            />
            <BRDDescription
              projects={br.projects || []}
              industryId={br.industryId}
              categoryId={br.categoryId}
              description={br.description || ""}
              company={br.company!}
            />
          </div>
        </div>
        <div className="space-y-3 mt-4">
          <BRDDetail br={br} />
          <RecordCompanySummary company={br.company!} />
          <BRDDiscussion
            isMyBr={isMyBr}
            reload={reload}
            brId={parseInt(br.id)}
          />
          <BRDAskQuestion
            refetchDiscussions={refetchDiscussions}
            brId={parseInt(br.id)}
          />
        </div>
      </div>
      <BRDAlsoNeeded brReference={br} />
    </div>
  );
};
export default TenderDetail;
