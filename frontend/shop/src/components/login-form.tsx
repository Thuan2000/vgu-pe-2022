import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Form from "./form";

// React-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

// UI
import Button from "./ui/storybook/button";
import Input from "./ui/storybook/inputs/input";
import Link from "./ui/link";
import Checkbox from "./ui/storybook/checkbox";
import { LoginMutation, useLoginMutation } from "../graphql/auth.graphql";
import {
  generateChatCredUnique,
  getRedirectLinkAfterLogin,
  removeRedirectLinkAfterLogin,
  setAuthCredentials,
  setMeData,
} from "../utils/auth-utils";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "../utils/routes";
import PasswordInput from "./ui/password-input";
import EmailOutlineIcon from "@assets/icons/email-outline-icon";
import { AUTH_ERRORS, CHAT_URL } from "@utils/constants";
import { COLORS } from "@utils/colors";
import { useWSChat } from "src/contexts/ws-chat.context";
import { generateChatPassword, generateUsername } from "@utils/functions";
import { useModal } from "src/contexts/modal.context";
import PasswordReset from "./ui/password-reset";
import { ICompany, IUser } from "@graphql/types.graphql";
import { chatGetLoginMessage } from "@utils/chat-messages";

type FormValues = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("form:email-invalid-error")
    .required("form:email-required-error"),
  password: yup.string().required("form:password-required-error"),
});

const LoginForm = () => {
  const router = useRouter();
  const { query } = router;
  const { loginChat } = useWSChat() || {};
  const [isAbleToPass, setIsAbleToPass] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string>();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: (query?.email as string) || "",
    },
  });
  const { t } = useTranslation("form");
  const [login, { loading }] = useLoginMutation({
    onError: (err) => console.error(err),
    onCompleted: onLoginComplete,
  });

  useEffect(() => {
    if (isAbleToPass) postLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAbleToPass]);

  function handlePasswordFirstResetAbort() {
    closeModal();
    Swal.fire({
      icon: "error",
      titleText: t(`form:error-password-not-resetted-title`),
      text: t(`form:error-password-not-resetted-message`),
      confirmButtonText: t(`form:error-password-not-resetted-button`),
      confirmButtonColor: COLORS.GREEN,
    });
  }

  async function handlePasswordResetted() {
    closeModal();
    const data = await Swal.fire({
      icon: "success",
      titleText: t(`form:password-resetted-success-title`),
      text: t(`form:password-resetted-success-message`),
      confirmButtonText: t(`form:password-resetted-success-button`),
      confirmButtonColor: COLORS.GREEN,
    });

    if (data.isDismissed || data.isConfirmed) setIsAbleToPass(true);
  }

  async function onLoginComplete({ login }: LoginMutation) {
    const { success, message, token, user } = login;
    if (success && !!user && !!token) {
      const comp = user?.company;

      setToken(token);
      setUser(user as any);
      // Put the compuslory modal here.
      if (user.firstLogin)
        openModal(
          (
            <PasswordReset
              onAbort={handlePasswordFirstResetAbort}
              user={user as any}
              onSuccess={handlePasswordResetted}
            />
          ) as any,
          { closeOnClickOutside: false }
        );
      else setIsAbleToPass(true);
    } else {
      const { isConfirmed } = await Swal.fire({
        icon: "info",
        iconColor: COLORS.GREEN,
        titleText: t(`form:error-${message}-title`),
        text: t(`form:error-${message}-message`),
        confirmButtonText: t(`form:error-${message}-button`),
        confirmButtonColor: COLORS.GREEN,
      });

      if (isConfirmed && message === AUTH_ERRORS.USER_NOT_FOUND)
        router.push(ROUTES.SIGNUP);
    }
  }

  async function postLogin() {
    // Set the logged in user first so we can use it to login on chat
    setAuthCredentials(token!);
    setMeData(user!);

    // Login to tinode chat server using company name and company id
    loginChat();

    toast.success(`${t("form:welcomeBack-message")} ${user?.firstName}`);
    router.replace(getRedirectLinkAfterLogin() || ROUTES.HOMEPAGE);
    removeRedirectLinkAfterLogin();
  }

  async function onSubmit({ email, password }: FormValues) {
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 space-y-4">
          <div className="space-y-2">
            <Input
              {...register("email")}
              prefix={<EmailOutlineIcon className="w-4 h-4" />}
              label={`${t("email-label")}*`}
              placeholder={t("email-placeholder")}
              error={t(errors?.email?.message || "")}
            />
            <PasswordInput
              transparentPrefix
              {...register("password")}
              label={`${t("password-label")}*`}
              placeholder={t("password-placeholder")}
              variant="outline"
              type="password"
              error={t(errors?.password?.message || "")}
            />
          </div>
          <Button
            loading={loading}
            size="small"
            className="w-full"
            type={"submit"}
          >
            {t("submit")}
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <Checkbox
            {...register("rememberMe")}
            name="rememberMe"
            label={`${t("remember-me")}`}
          />
          <Link
            className="text-xs text-blue-blue text-blue"
            href={ROUTES.FORGET_PASSWORD}
            noDecoration
          >
            {t("forget-password")}
          </Link>
        </div>
      </Form>
      {/* <SocialLogin /> */}
    </>
  );
};
export default LoginForm;
