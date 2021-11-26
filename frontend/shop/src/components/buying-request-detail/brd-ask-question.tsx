import AttachmentIcon from "@assets/icons/attachment-icon";
import ImageIcon from "@assets/icons/image-icon";
import Button from "@components/ui/storybook/button";
import TextArea from "@components/ui/storybook/inputs/text-area";
import {
  CreateBrDiscussionQuestionMutation,
  useCreateBrDiscussionQuestionMutation,
} from "@graphql/br-discussion.graphql";
import { getCompanyName, getLoggedInUser } from "@utils/functions";
import { TextareaHTMLAttributes } from "hoist-non-react-statics/node_modules/@types/react";

import { useTranslation } from "next-i18next";
import React, { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";

interface IBRDAskQuestionProps {
  brId: number;
  refetchDiscussions: () => void;
}

const BRDAskQuestion: React.FC<IBRDAskQuestionProps> = ({
  brId,
  refetchDiscussions,
}) => {
  const ICON_SIZE = 5;
  const iconClass = `w-${ICON_SIZE} h-${ICON_SIZE}`;

  const { t } = useTranslation("form");
  const [createQuestion] = useCreateBrDiscussionQuestionMutation({
    onCompleted: handleQuestionCreated,
  });
  const [question, setQuestion] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setQuestion(e.target.value);
  }

  function handleQuestionCreated({
    createBRDiscussionQuestion,
  }: CreateBrDiscussionQuestionMutation) {
    const { message, success } = createBRDiscussionQuestion || {};
    if (success === false) {
      Swal.fire({
        icon: "error",
        title: t("question-submission-error"),
      });
    } else {
      Swal.fire({
        icon: "success",
        title: t("question-submitted-success-message"),
      });

      refetchDiscussions();
    }
  }

  function submit() {
    const input = {
      userId: getLoggedInUser()?.id,
      companyName: getCompanyName(),
      brId,
      question,
    };

    setQuestion("");

    createQuestion({ variables: { input: input as any } });
  }

  return (
    <div>
      <TextArea
        label={t("askQuestion-input-label")}
        placeholder={t("askQuestion-input-placeholder")}
        onChange={handleChange}
        value={question}
      />

      <p className="text-right">
        <div className="mb-3 fic justify-end space-x-1">
          <AttachmentIcon className={iconClass} />
          <ImageIcon className={iconClass} />
        </div>
        <Button disabled={!question} onClick={submit} size="small">
          {t("ask-question-button-label")}
        </Button>
      </p>
    </div>
  );
};
export default BRDAskQuestion;