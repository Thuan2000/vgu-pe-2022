import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Form from "./form";
import Input from "./ui/storybook/input";
import Checkbox from "./ui/storybook/checkbox";
import Button from "./ui/storybook/button";
import PhoneNumberInput from "./ui/phone-number-input/phone-number-input";
import DocumentUploader from "./ui/storybook/document-uploader";
import DocumentInput from "./ui/storybook/document-input";

type FormValues = {
	first_name: string;
	last_name: string;
	email: string;
	registration_code: string;
	password: string;
	confirm_password: string;
	email_subscription: boolean;
	agreement: boolean;
	phone_number: string;
	company_name: string;
};

const signupSchema = yup.object().shape({
	first_name: yup.string().required("form:first_name-required-error"),
	last_name: yup.string().required("form:last_name-required-error"),
	phone_number: yup.string().required("form:phone_number-required-error"),
	company_name: yup.string().required("form:company_name-required-error"),
	registration_code: yup
		.string()
		.required("form:registration_code-required-error"),
	email: yup
		.string()
		.required("form:email-required-error")
		.email("form:email-invalid-error"),
	password: yup.string().required("form:password-required-error"),
	confirm_password: yup
		.string()
		.required("form:password-required-error")
		.oneOf([yup.ref("password"), null], "form:password-not-match-error")
});

const SignupForm = () => {
	const { t } = useTranslation("form");

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(signupSchema)
	});

	function onSubmit(values: FormValues) {
		console.log(values);
	}

	return (
		<Form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("first_name")}
					label={t("first_name-label")}
					placeholder={t("first_name-placeholder")}
					error={t(errors?.first_name?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("last_name")}
					label={t("last_name-label")}
					placeholder={t("last_name-placeholder")}
					error={t(errors?.last_name?.message || "")}
				/>
			</div>
			<div className="md:flex md:my-5">
				<PhoneNumberInput
					control={control}
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("phone_number")}
					label={t("phone_number-label")}
					variant="outline"
					placeholder={t("phone_number-placeholder")}
					error={t(errors?.phone_number?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("email")}
					label={t("email-label")}
					placeholder={t("email-placeholder")}
					error={t(errors?.email?.message || "")}
				/>
			</div>
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("password")}
					label={t("password-label")}
					type="password"
					placeholder={t("password-placeholder")}
					error={t(errors?.password?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("confirm_password")}
					label={t("confirm_password-label")}
					type="password"
					placeholder={t("confirm_password-label")}
					error={t(errors?.confirm_password?.message || "")}
				/>
			</div>
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("company_name")}
					label={t("company_name-label")}
					placeholder={t("company_name-placeholder")}
					error={t(errors?.company_name?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("registration_code")}
					label={t("registration_code-label")}
					placeholder={t("registration_code-placeholder")}
					error={t(errors?.registration_code?.message || "")}
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
