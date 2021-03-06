import Button from "@components/ui/storybook/button";
import TextArea from "@components/ui/storybook/inputs/text-area";
import {
  CreateBrDiscussionAnswerMutation,
  useCreateBrDiscussionAnswerMutation,
} from "@graphql/br-discussion.graphql";
import {
  IBrDiscussionQuestion,
  IDiscussionAnswer,
  IUser,
} from "@graphql/types.graphql";
import { getCompanyName, getLoggedInUser } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import DiscussionItem from "./discussion-item";

interface IBRDDiscussionQuestionProps {
  discussionQuestion: IBrDiscussionQuestion;
  isMyBr: boolean;
  onAnswered: () => void;
}

const BRDDiscussionQuestion: React.FC<IBRDDiscussionQuestionProps> = ({
  discussionQuestion,
}) => {
  const { t } = useTranslation();

  const [isReplying, setIsReplying] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerError, setAnswerError] = useState("");

  const {
    id,
    user,
    companyName,
    question,
    createdAt,
    answers: discAnswers,
  } = discussionQuestion;

  const [answers, setAnswers] = useState([
    ...(discussionQuestion.answers || []),
  ]);

  const [replyQuestion] = useCreateBrDiscussionAnswerMutation({
    onCompleted: handleReplied,
  });

  function handleReplied({
    createBRDiscussionAnswer: { message, success },
  }: CreateBrDiscussionAnswerMutation) {
    if (success)
      Swal.fire({
        icon: "success",
        title: t("answer-submission-success"),
      });
    else if (!success)
      Swal.fire({
        icon: "error",
        title: t(`answer-${message}-error`),
      });
  }

  function handleReplyClick() {
    setIsReplying(true);
  }

  function handleCancelReplyClick() {
    setIsReplying(false);
    setAnswerError("");
  }

  function generateAnswerForUI() {
    const newAnswer: IDiscussionAnswer = {
      answer,
      companyName: getCompanyName()!,
      createdAt: new Date(),
      user: getLoggedInUser()!,
    };

    answers?.push(newAnswer);
    setAnswers([...answers]);
  }

  function handleSendReplyClick() {
    setIsReplying(false);
    generateAnswerForUI();
    if (!answer) {
      setAnswerError(t("answer-empty-error"));
      return;
    }

    replyQuestion({
      variables: {
        input: {
          answer,
          companyName: getCompanyName()!,
          brDiscussionQuestionId: id,
          userId: getLoggedInUser()?.id!,
        },
      },
    });
  }

  function handleAnswerChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswerError("");
    setAnswer(e.target.value);
  }

  return (
    <div className="py-1 my-2">
      <div>
        <DiscussionItem
          user={user}
          companyName={companyName}
          createdAt={createdAt}
          text={question}
        />
      </div>

      <div className="ml-4 mt-3">
        {answers?.map(({ answer, user, companyName, createdAt }) => {
          return (
            <div key={user.id + companyName + answer}>
              <DiscussionItem
                user={user}
                companyName={companyName}
                createdAt={createdAt}
                text={answer}
              />
            </div>
          );
        })}

        {/* {isMyBr && ( */}
        <div className={`mt-1`}>
          {isReplying ? (
            <div className={`flex flex-col`}>
              <TextArea
                autoFocus
                onChange={handleAnswerChange}
                placeholder={t("question-answer-input-placeholder")}
                error={answerError}
              />
              <div className={`fic space-x-2 justify-end`}>
                <Button onClick={handleCancelReplyClick} variant="cancel">
                  {t("cancel-text")}
                </Button>
                <Button onClick={handleSendReplyClick}>
                  {t("reply-text")}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleReplyClick}
              className="text-primary border border-black"
              variant="custom"
            >
              {t("reply-text")}
            </Button>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
export default BRDDiscussionQuestion;
