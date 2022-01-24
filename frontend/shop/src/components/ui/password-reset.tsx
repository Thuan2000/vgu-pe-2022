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

type TPasswordResetFormValues = {
  password: string;
  confirmPassword: string;
};

const resolver = yup.object({
  password: yup
    .string()
    .required("passwordRequired-error")
    .matches(/^(?=.{8,})/, "passwordTooShort-error")
    .matches(/[A-Z]/, "passwordNotHaveUppercase-error")
    .matches(/[a-z]/, "passwordNotHaveLowercase-error")
    .matches(/[0-9]/, "passwordNotHaveNumber-error"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwordNotMatch-error")
    .required("passwordNotMatch-error"),
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
    resolver: yupResolver(resolver),
    reValidateMode: "onChange",
  });

  const { email } = user;

  function onSubmit(value: TPasswordResetFormValues) {
    resetPassword({
      variables: { input: { email, newPassword: value.password } },
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
      <div className="mt-10 space-y-4">
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
          <Button onClick={onAbort} className={`!w-48`} color="error">
            {t("cancel-button-label")}
          </Button>
          <Button className={`!w-48`} type="submit">
            {t("setPassword-button-label")}
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default PasswordReset;
