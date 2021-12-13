import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import Typography from "@components/ui/storybook/typography";
import Button from "@components/ui/storybook/button";
import { viDateFormat } from "@utils/functions";
import { useBrDiscussionQuestionsQuery } from "@graphql/br-discussion.graphql";
import BRDDiscussionQuestion from "./brd-discussion-question";

interface IBRDDiscussionProps {
  brId: number;
  reload: boolean;
}

const BRDDiscussion: React.FC<IBRDDiscussionProps> = ({ reload, brId }) => {
  const { t } = useTranslation("common");

  function getInputParams() {
    return { input: { sort: "DATE" as any, brId, offset: 0, limit: 5 } };
  }
  const { data, refetch } = useBrDiscussionQuestionsQuery({
    variables: getInputParams(),
  });

  useEffect(() => {
    refetch(getInputParams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const discussions = data?.brDiscussionQuestions;
  return (
    <div className={`border space-y-4 relative rounded-md`}>
      <div className="flex items-baseline space-x-2 m-4">
        <Typography
          text={t("brd-discussion-title")}
          variant="title"
          size="md"
        />
        <Typography
          text={`${discussions?.length} ${t("brd-questions-text")}`}
          variant="description"
          size="md"
        />
      </div>

      <div className="fic bg-gray-100 bg-opacity-60 px-4 py-1 space-x-2">
        <Typography
          text={`${t("brd-sortBy-title")}:`}
          variant="smallTitle"
          color="gray-400"
        />
        <Button size="small" className="text-gray-400" variant="custom">
          {t("brd-updateKey-sort-button-label")}
        </Button>
        <Button size="small" className="text-gray-400" variant="custom">
          {t("brd-date-sort-button-label")}
        </Button>
      </div>

      {discussions && !!discussions.length ? (
        <div className="px-4">
          {discussions.map((d: any) => (
            <BRDDiscussionQuestion
              key={d.createdAt + "" + d.question}
              discussionQuestion={d}
            />
          ))}
        </div>
      ) : (
        <div className="px-4 pb-4">
          <Typography text={t("no-discussion-for-br")} variant="description" />
        </div>
      )}
    </div>
  );
};
export default BRDDiscussion;
