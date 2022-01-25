import EmailOutlineIcon from "@assets/icons/email-outline-icon";
import Button from "@components/ui/storybook/button";
import Input from "@components/ui/storybook/inputs/input";
import Typography from "@components/ui/storybook/typography";
import { useForgetPasswordSendEmailMutation } from "@graphql/auth.graphql";
import { useIsVerifiedUserMutation } from "@graphql/user.graphql";
import { COLORS } from "@utils/colors";
import { getIsValidEmail } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

interface IFPEmailInputProps {
  toNextStep: () => void;
}

const FPEmailInput: React.FC<IFPEmailInputProps> = ({ toNextStep }) => {
  const { t } = useTranslation("form");
  const firstRun = useRef(true);
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [sendToken, { loading: sending }] =
    useForgetPasswordSendEmailMutation();

  const [getIsVerified] = useIsVerifiedUserMutation();

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (!email) setEmailError("emai-required-error");
    else if (!getIsValidEmail(email)) setEmailError("email-not-valid-error");
    else setEmailError("");
  }, [email]);

  async function fireNotVerifiedUserSwal() {
    const { isConfirmed, isDenied, isDismissed } = await Swal.fire({
      icon: "error",
      titleText: t(`form:passwordChange-userNotVerified-title`),
      text: t(`form:passwordChange-userNotVerified-message`),
      confirmButtonText: t(
        `form:passwordChange-userNotVerified-toLogin-button-title`
      ),
      confirmButtonColor: COLORS.SECONDARY,
      denyButtonText: t(
        `form:passwordChange-userNotVerified-stay-button-title`
      ),
      denyButtonColor: COLORS.WARNING,
      showDenyButton: true,
    });

    if (isConfirmed) {
      router.replace(ROUTES.LOGIN);
    }
  }

  async function sendEmailToken() {
    if (!email || !!emailError) return;

    const { data } = await getIsVerified({
      variables: { email },
    });
    const isVerifiedUser = data?.isVerifiedUser;
    if (!isVerifiedUser) {
      fireNotVerifiedUserSwal();
      return;
    }
    toNextStep();
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
          {t(`forgetPasswordEmail-button-label`)}
        </Button>
      </p>
    </>
  );
};
export default FPEmailInput;
