import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Form from "./form";
import Input from "./ui/storybook/input";
import DocumentInput from "./ui/storybook/document-input";
import Checkbox from "./ui/storybook/checkbox";
import Button from "./ui/storybook/button";

type FormValues = {
	first_name: string;
	last_name: string;
	email: string;
	registration_code: string;
	password: string;
	confirm_password: string;
	email_subscription: boolean;
	agreement: boolean;
};

const signupSchema = yup.object().shape({
	first_name: yup.string().required("form:first_name-required-error"),
	last_name: yup.string().required("form:last_name-required-error"),
	registration_code: yup
		.string()
		.required("form:registration_code-required-error"),
	email: yup
		.string()
		.required("form:email-required-error")
		.email("form:email-invalid-error"),
	password: yup.string().required("form:password-required-error")
});

const SignupForm = () => {
	const { t } = useTranslation("form");

	const {
		register,
		control,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(signupSchema)
	});

	return (
		<Form className="mt-10">
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("first_name")}
					label={t("first_name-label")}
					error={t(errors?.first_name?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("last_name")}
					label={t("last_name-label")}
					error={t(errors?.last_name?.message || "")}
				/>
			</div>
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("registration_code")}
					label={t("registration_code-label")}
					error={t(errors?.registration_code?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("email")}
					label={t("email-label")}
					error={t(errors?.email?.message || "")}
				/>
			</div>
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("password")}
					label={t("password-label")}
					error={t(errors?.password?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("confirm_password")}
					label={t("confirm_password-label")}
					error={t(errors?.confirm_password?.message || "")}
				/>
			</div>
			<div className="mt-7">
				<DocumentInput
					control={control}
					name="company_license"
					label={t("license-label")}
					subLabel={t("license-subLabel")}
				/>
			</div>
			<div className="my-4">
				<Checkbox
					{...register("email_subscription")}
					label={t("want-to-receive-email")}
					className="mt-5 mb-2 text-dark-blue text-sm"
				/>
				<Checkbox
					className="text-dark-blue text-sm"
					{...register("agreement")}
					label={t("agreement")}
				/>
			</div>
			<Button size="fluid">{t("signup")}</Button>
		</Form>
	);
};
export default SignupForm;
