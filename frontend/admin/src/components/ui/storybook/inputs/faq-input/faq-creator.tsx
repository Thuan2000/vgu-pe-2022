import Form from "@components/form";
import { preventSubmitOnEnter } from "@utils/functions";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../button";
import Typography from "../../typography";
import Input from "../input";
import TextArea from "../text-area";
import { IFaq } from "./faq-list-creator";

interface IFAQCreatorProps {
  initValue?: IFaq;
  onCreate: (e: IFaq) => void;
  faqsLength?: number;
  onCancel: () => void;
}

const FAQCreator: React.FC<IFAQCreatorProps> = ({
  onCreate,
  faqsLength,
  initValue,
  onCancel,
}) => {
  const { t } = useTranslation("form");
  const [question, setQuestion] = useState(initValue?.question || "");
  const [questionErrorMessage, setQuestionErrorMessage] = useState("");
  const [answerErrorMessage, setAnswerErrorMessage] = useState("");
  const [answer, setAnswer] = useState(initValue?.answer || "");

  function handleQuestionChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) setQuestionErrorMessage("faq-question-required-error");
    if (!!e.target.value) setQuestionErrorMessage("");

    setQuestion(e.target.value);
  }
  function handleAnswerChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!e.target.value) setAnswerErrorMessage("faq-answer-required-error");
    if (!!e.target.value) setAnswerErrorMessage("");

    setAnswer(e.target.value);
  }

  function handleSubmit() {
    if (!question) setQuestionErrorMessage("faq-question-required-error");
    if (!answer) setAnswerErrorMessage("faq-answer-required-error");

    if (!question || !answer) return;

    if (initValue) onCreate({ id: initValue.id, question, answer });
    else onCreate({ id: (faqsLength || 0) + 1, question, answer });
  }

  function closeCreator() {
    onCancel();
  }

  return (
    <>
      <div className="border border-gray-200 rounded-sm">
        <div className="border-b border-gray-200 rounded-sm py-3 px-4">
          <Typography text={t("faq-input-title")} element="h3" size="sm" />
        </div>
        <div className="px-4 py-3 space-y-3 bg-gray-10">
          <Input
            label={t("faq-input-question-label")}
            placeholder={t("faq-input-question-placeholder")}
            labelFontSize="xs"
            required
            value={question}
            onChange={handleQuestionChange}
            error={t(questionErrorMessage)}
            {...preventSubmitOnEnter()}
          />
          <TextArea
            label={t("faq-input-answer-label")}
            placeholder={t("faq-input-answer-placeholder")}
            labelFontSize="xs"
            required
            value={answer}
            onChange={handleAnswerChange}
            error={t(answerErrorMessage)}
          />

          <div className="flex items-center justify-end space-x-4">
            {!!onCancel && (
              <Button
                className="sm:w-1/5"
                variant="cancel"
                onClick={closeCreator}
              >
                {t("cancel-button-label")}
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              className="sm:w-1/5"
              color="secondary-1"
            >
              {!!initValue
                ? t("update-button-label")
                : t("create-button-label")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FAQCreator;
