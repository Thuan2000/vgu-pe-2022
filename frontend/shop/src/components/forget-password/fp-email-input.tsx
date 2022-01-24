import EmailOutlineIcon from "@assets/icons/email-outline-icon";
import Button from "@components/ui/storybook/button";
import Input from "@components/ui/storybook/inputs/input";
import Typography from "@components/ui/storybook/typography";
import { useForgetPasswordSendEmailMutation } from "@graphql/auth.graphql";
import { getIsValidEmail } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface IFPEmailInputProps {}

const FPEmailInput: React.FC<IFPEmailInputProps> = ({}) => {
  const { t } = useTranslation("form");
  const firstRun = useRef(true);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [sendToken, { loading: sending }] =
    useForgetPasswordSendEmailMutation();

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (!email) setEmailError("emai-required-error");
    else if (!getIsValidEmail(email)) setEmailError("email-not-valid-error");
    else setEmailError("");
  }, [email]);

  function sendEmailToken() {
    if (!email || !!emailError) return;

    sendToken({ variables: { email } });
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  return (
    <>
      <div className="fic flex-col">
        <EmailOutlineIcon className={`w-24 h-24`} />
        <Typography text={t("enter-email-title")} size="xl" weight="bold" />
        <Typography text={t("enter-email-message")} size="md" />
      </div>
      <Input
        value={email}
        error={t(emailError)}
        onChange={handleEmailChange}
        placeholder={t("email-placeholder")}
        className={`w-full`}
      />

      <p className={`text-center`}>
        <Button
          loading={sending}
          onClick={sendEmailToken}
          className={`self-center`}
        >
          {t("forgetPassword-email-button-label")}
        </Button>
      </p>
    </>
  );
};
export default FPEmailInput;
