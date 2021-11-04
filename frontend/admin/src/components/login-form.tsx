import React from "react";
import { useTranslation } from "react-i18next";

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
import {
  LoginMutation,
  useLoginMutation,
  useMeInfoMutation,
} from "../graphql/auth.graphql";
import { setAuthCredentials, setMeData } from "../utils/auth-utils";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "../utils/routes";
import PasswordInput from "./ui/password-input";
import EmailOutlineIcon from "@assets/icons/email-outline-icon";
import SocialLogin from "./social-login";
import { AUTH_ERRORS } from "@utils/constants";
import { COLORS } from "@utils/colors";
import { IMeInfoResponse } from "@graphql/types.graphql";

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
  const [meInfo, { loading: meInfoLoading }] = useMeInfoMutation({
    onCompleted: () => {
      // Redirect to homepage
      router.replace(ROUTES.HOMEPAGE);
    },
  });
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
    onError: (err) => console.log(err),
    onCompleted: onLoginComplete,
  });

  async function onLoginComplete({ login }: LoginMutation) {
    const { success, message, token, role } = login;
    if (success) {
      // Set auth cred
      setAuthCredentials(token!, role!);

      // Fetch the Me data
      const { data } = await meInfo();
      setMeData(data?.meInfo as IMeInfoResponse);
      return;
    }

    Swal.fire({
      icon: "info",
      iconColor: COLORS.GREEN,
      titleText: t(`form:error-${message}-title`),
      text: t(`form:error-${message}-message`),
      confirmButtonText: t(`form:error-${message}-button`),
      confirmButtonColor: COLORS.GREEN,
    }).then(({ isConfirmed }) => {
      if (isConfirmed && message === AUTH_ERRORS.USER_NOT_FOUND) {
        router.push(ROUTES.SIGNUP);
      }
    });
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
        <div className="mb-3">
          <Input
            {...register("email")}
            className="mt-7 mb-5"
            prefix={<EmailOutlineIcon className="w-4 h-4" />}
            label={`${t("email-label")}*`}
            placeholder={t("email-placeholder")}
            error={t(errors?.email?.message || "")}
          />
          <PasswordInput
            transparentPrefix
            {...register("password")}
            className="mb-5"
            label={`${t("password-label")}*`}
            placeholder={t("password-placeholder")}
            variant="outline"
            type="password"
            error={t(errors?.password?.message || "")}
          />
          <Button
            loading={loading || meInfoLoading}
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
