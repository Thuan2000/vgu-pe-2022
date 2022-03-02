import Button from "@components/ui/storybook/button";
import TextArea from "@components/ui/storybook/inputs/text-area";
import {
  CreateProductDiscussionQuestionMutation,
  useCreateProductDiscussionQuestionMutation,
} from "@graphql/product-discussion.graphql";
import { isLogin as checkIsLogin } from "@utils/auth-utils";
import {
  firePleaseLoginSwal,
  getCompanyName,
  getLoggedInUser,
} from "@utils/functions";
import { ROUTES } from "@utils/routes";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useRef } from "react";
import Swal from "sweetalert2";

interface ISDDAskQuestionProps {
  productId: number;
  refetchDiscussions: () => void;
}

const PDDAskQuestion: React.FC<ISDDAskQuestionProps> = ({
  productId,
  refetchDiscussions,
}) => {
  const router = useRouter();
  const ICON_SIZE = 5;
  // const iconClass = `w-${ICON_SIZE} h-${ICON_SIZE}`;
  const isLogin = checkIsLogin();
  const textAreaRef = useRef<any>();

  const { t } = useTranslation("form");
  const [createQuestion] = useCreateProductDiscussionQuestionMutation({
    onCompleted: handleQuestionCreated,
  });
  const [question, setQuestion] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!isLogin) return;
    setQuestion(e.target.value);
  }

  function handleQuestionCreated({
    createProductDiscussionQuestion,
  }: CreateProductDiscussionQuestionMutation) {
    const { message, success } = createProductDiscussionQuestion || {};
    if (success === false) {
      Swal.fire({
        icon: "error",
        title: t(`${message}-question-submission-error`),
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
      productId,
      question,
    };

    setQuestion("");

    createQuestion({ variables: { input: input as any } });
  }

  async function handleFocus() {
    if (!isLogin) {
      textAreaRef.current.blur();
      // Reverted deny === right, confirm === left
      const { isDenied, ...rest } = await firePleaseLoginSwal(t, Swal, {
        confirmButton: t("stay-button-label"),
      });
      if (isDenied) router.push(ROUTES.LOGIN);
    }
  }

  return (
    // <div className={`relative ${!isLogin && "border rounded-sm p-4"}`}>
    //   {!isLogin && (
    //     <div className={`absolute flex-center abs-fullsize z-50`}>
    //       <PleaseLoginButton text={t("please-login-to-comment")} />
    //     </div>
    //   )}
    <div>
      {/* <div className={`${!isLogin && "blur-sm select-none"}`}> */}
      <TextArea
        ref={textAreaRef}
        label={t("askQuestion-input-label")}
        placeholder={t("askQuestion-input-placeholder")}
        onChange={handleChange}
        onClick={handleFocus}
        value={question}
      />

      <p className="text-right">
        {/* <div className="mb-3 fic justify-end space-x-1">
            <AttachmentIcon className={iconClass} />
            <ImageIcon className={iconClass} />
          </div> */}
        <Button disabled={!question} onClick={submit} size="small">
          {t("ask-question-button-label")}
        </Button>
      </p>
      {/* </div> */}
    </div>
  );
};
export default PDDAskQuestion;
