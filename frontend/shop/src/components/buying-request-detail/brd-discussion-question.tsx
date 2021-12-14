import Typography from "@components/ui/storybook/typography";
import { IBrDiscussionQuestion } from "@graphql/types.graphql";
import { formatDateWithHour } from "@utils/functions";
import React from "react";

interface IBRDDiscussionQuestionProps {
  discussionQuestion: IBrDiscussionQuestion;
}

const BRDDiscussionQuestion: React.FC<IBRDDiscussionQuestionProps> = ({
  discussionQuestion,
}) => {
  const { user, companyName, question, createdAt } = discussionQuestion;
  return (
    <div className="py-1 my-2">
      <div className="fic space-x-2">
        <Typography
          text={`${user.firstName} ${user.lastName}`}
          variant="smallTitle"
        />
        <Typography text={companyName} color="gray" />
      </div>
      <Typography text={question} />
      <Typography
        text={formatDateWithHour(createdAt || "")}
        variant="description"
      />
    </div>
  );
};
export default BRDDiscussionQuestion;
