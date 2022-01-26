import Form from "@components/form";
import PasswordInput from "@components/ui/password-input";
import {
  passwordResetResolver,
  TPasswordResetFormValues,
} from "@components/ui/password-reset";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import {
  ForgetResetPasswordMutation,
  useForgetResetPasswordMutation,
} from "@graphql/auth.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { COLORS } from "@utils/colors";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetEmailFromCryptoTokenQuery } from "@graphql/auth.graphql";
import Swal from "sweetalert2";

interface IFPNewPasswordInputProps {}

const FPNewPasswordInput: React.FC<IFPNewPasswordInputProps> = () => {
  const { t } = useTranslation("form");
  const { query, ...router } = useRouter();
  const token = query.token as string;

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<TPasswordResetFormValues>({
    resolver: yupResolver(passwordResetResolver),
    reValidateMode: "onChange",
  });

  const [resetPassword] = useForgetResetPasswordMutation({
    onCompleted: handlePasswordResetted,
  });
  const { data, loading } = useGetEmailFromCryptoTokenQuery({
    variables: { token },
  });
  const email = data?.getEmailFromCryptoToken;

  useEffect(() => {
    if (!email && !loading) fireInvalidTokenSwal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  async function fireSuccessSwal() {
    const data = await Swal.fire({
      icon: "success",
      titleText: t(`form:passwordChange-success-title`),
      text: t(`form:passwordChange-success-message`),
      confirmButtonText: t(`form:passwordChange-success-button`),
      confirmButtonColor: COLORS.PRIMARY.DEFAULT,
    });

    if (data) {
      router.replace(ROUTES.LOGIN);
      toast.success(t("form:passwordChange-success-title"));
    }
  }

  async function fireInvalidTokenSwal() {
    const { pathname } = router;
    const data = await Swal.fire({
      icon: "error",
      titleText: t(`form:passwordChange-tokenInvalid-title`),
      text: t(`form:passwordChange-tokenInvalid-message`),
      confirmButtonText: t(`form:passwordChange-tokenInvalid-button-title`),
      confirmButtonColor: COLORS.ERROR,
    });

    delete query.token;

    if (data) {
      router.replace({
        pathname,
        query: { ...query },
      });
    }
  }

  async function handlePasswordResetted({
    forgetResetPassword: { message, success },
  }: ForgetResetPasswordMutation) {
    if (success) fireSuccessSwal();
    else if (!success && message === "TOKEN_INVALID") fireInvalidTokenSwal();
  }

  function onSubmit(value: TPasswordResetFormValues) {
    resetPassword({
      variables: { input: { email, token, newPassword: value.password } },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="fic flex-col">
      <Typography
        text={t("please-change-your-password-title")}
        size="xl"
        weight="bold"
      />
      <div className="mt-10 space-y-4" style={{ minWidth: 350 }}>
        <div className={`fic space-x-2`}>
          <Typography size="md" text={`${t("email-label")}: `} />
          <Typography size="md" weight="bold" text={email!} />
        </div>
        <div className="space-y-5">
          <PasswordInput
            inputClassName="-mt-2"
            required
            {...register("password")}
            onChange={(e) => {
              register("password").onChange(e);
              trigger("password");
              trigger("confirmPassword");
            }}
            label={t("password-label")}
            error={t(errors.password?.message || "")}
          />
          <PasswordInput
            required
            inputClassName="-mt-2"
            {...register("confirmPassword")}
            onChange={(e) => {
              register("confirmPassword").onChange(e);
              trigger("confirmPassword");
            }}
            label={t("confirmPassword-label")}
            error={t(errors.confirmPassword?.message || "")}
          />
        </div>
        <div className="fic !mt-10 justify-evenly">
          <Button className={`!w-48`} type="submit">
            {t("setPassword-button-label")}
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default FPNewPasswordInput;
