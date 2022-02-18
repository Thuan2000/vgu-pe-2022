import Form from "@components/form";
import { IUser } from "@graphql/types.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./storybook/button";
import Input from "./storybook/inputs/input";
import Typography from "./storybook/typography";
import * as yup from "yup";
import { useFirstTimePasswordResetMutation } from "@graphql/auth.graphql";
import PasswordInput from "./password-input";
import EyeIcon from "@assets/icons/eye-icon";
import PencilIcon from "@assets/icons/pencil-icon";
import { COLORS } from "@utils/colors";

interface IPasswordResetProps {
  onSuccess: () => void;
  onAbort: () => void;
  user: IUser;
}

export type TPasswordResetFormValues = {
  password: string;
  confirmPassword: string;
};

export const passwordResetResolver = yup.object({
  // TODO: Add proper translations here. Since Vietnamese is the priority, putting Vietnamese here first.
  password: yup
    .string()
    .required("Vui lòng đặt mật khẩu")
    .matches(/^(?=.{8,})/, "Mật khẩu quá ngắn")
    .matches(/[A-Z]/, "Mật khẩu chưa có ký tự viết hoa")
    .matches(/[a-z]/, "Mật khẩu chưa có ký tự thường")
    .matches(/[0-9]/, "Mật khẩu chưa có số")
    .matches(/^\S*$/, "Mật khẩu không được chứa khoảng trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Mật khẩu không khớp"),
});

const PasswordReset: React.FC<IPasswordResetProps> = ({
  onSuccess,
  onAbort,
  user = {},
}) => {
  const { t } = useTranslation("form");

  const [resetPassword] = useFirstTimePasswordResetMutation();
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<TPasswordResetFormValues>({
    resolver: yupResolver(passwordResetResolver),
    reValidateMode: "onChange",
  });

  const { email } = user;

  function onSubmit(value: TPasswordResetFormValues) {
    resetPassword({
      variables: { input: { email: email!, newPassword: value.password } },
    });

    onSuccess();
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-white p-10 rounded-sm`}
    >
      <Typography
        text={t("please-change-your-password-title")}
        size="xl"
        weight="bold"
      />
      <Typography
        className={`mt-2 indent-3 w-80`}
        text={t("please-change-your-password-message")}
        size="md"
      />
      <div className="mt-5 space-y-4">
        <div className={`fic space-x-2`}>
          <Typography size="md" text={`${t("email-label")}: `} />
          <Typography size="md" weight="bold" text={email!} />
        </div>
        <div className="space-y-5">
          <PasswordInput
            inputClassName="-mt-2"
            placeholder={t("password-placeholder")}
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
            placeholder={t("password-placeholder")}
            {...register("confirmPassword")}
            onChange={(e) => {
              register("confirmPassword").onChange(e);
              trigger("confirmPassword");
            }}
            label={t("confirmPassword-label")}
            error={t(errors.confirmPassword?.message || "")}
          />
        </div>
        <div className="fic !mt-10 justify-evenly space-x-5">
          <Button
            onClick={onAbort}
            className={`!min-w-[200px] w-1/2`}
            color="error"
          >
            {t("cancel-button-label")}
          </Button>
          <Button className={`!min-w-[200px] w-1/2`} type="submit">
            {t("setPassword-button-label")}
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default PasswordReset;
