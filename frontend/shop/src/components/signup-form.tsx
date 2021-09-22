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
import DocumentInput from "./ui/storybook/document-input";
import { useCompanySignupMutation } from "@graphql/company.graphql";
import { Router, useRouter } from "next/dist/client/router";
import { ROUTES } from "@utils/routes";

type FormValues = {
	firstName: string;
	lastName: string;
	email: string;
	licenseNumber: string;
	password: string;
	confirmPassword: string;
	emailSubscription: boolean;
	agreement: boolean;
	phoneNumber: string;
	companyName: string;
	companyLicenses: Array<File>;
};

const signupSchema = yup.object().shape({
	firstName: yup.string().required("form:firstName-required-error"),
	lastName: yup.string().required("form:lastName-required-error"),
	phoneNumber: yup.string().required("form:phoneNumber-required-error"),
	companyName: yup.string().required("form:companyName-required-error"),
	licenseNumber: yup.string().required("form:licenseNumber-required-error"),
	email: yup
		.string()
		.required("form:email-required-error")
		.email("form:email-invalid-error"),
	password: yup.string().required("form:password-required-error"),
	confirmPassword: yup
		.string()
		.required("form:password-required-error")
		.oneOf([yup.ref("password"), null], "form:password-not-match-error"),
	companyLicenses: yup
		.array()
		.min(1, "form:companyLicenses-is-required-error")
		.required("form:companyLicenses-is-required-error")
});

const SignupForm = () => {
	const { t } = useTranslation("form");
	const router = useRouter();
	const [signup, { loading }] = useCompanySignupMutation({
		onCompleted: ({ companySignup: { success, message } }) => {
			if (!success) {
				alert(message);
			}

			router.push(ROUTES.LOGIN);
		}
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(signupSchema)
	});

	async function onSubmit({
		companyLicenses,
		confirmPassword,
		...values
	}: FormValues) {
		const input = {
			licenseFiles: companyLicenses,
			...values
		};

		await signup({
			variables: { input }
		});
	}

	return (
		<Form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("firstName")}
					label={t("firstName-label")}
					placeholder={t("firstName-placeholder")}
					error={t(errors?.firstName?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("lastName")}
					label={t("lastName-label")}
					placeholder={t("lastName-placeholder")}
					error={t(errors?.lastName?.message || "")}
				/>
			</div>
			<div className="md:flex md:my-5">
				<PhoneNumberInput
					control={control}
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("phoneNumber")}
					label={t("phoneNumber-label")}
					variant="outline"
					placeholder={t("phoneNumber-placeholder")}
					error={t(errors?.phoneNumber?.message || "")}
				/>
				{/* @TODO: OnBlur check if the email is exist */}
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
					{...register("confirmPassword")}
					label={t("confirmPassword-label")}
					type="password"
					placeholder={t("confirmPassword-label")}
					error={t(errors?.confirmPassword?.message || "")}
				/>
			</div>
			<div className="md:flex md:my-5">
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96 md:mr-16"
					{...register("companyName")}
					label={t("companyName-label")}
					placeholder={t("companyName-placeholder")}
					error={t(errors?.companyName?.message || "")}
				/>
				<Input
					noPrefix
					className="my-5 md:my-0 md:w-96"
					{...register("licenseNumber")}
					label={t("licenseNumber-label")}
					placeholder={t("licenseNumber-placeholder")}
					error={t(errors?.licenseNumber?.message || "")}
				/>
			</div>
			<div className="mt-7">
				<DocumentInput
					control={control}
					name="companyLicenses"
					label={t("license-label")}
					subLabel={t("license-subLabel")}
					error={t((errors?.companyLicenses as any)?.message || "")}
				/>
			</div>
			<div className="my-4">
				<Checkbox
					{...register("emailSubscription")}
					label={t("want-to-receive-email")}
					className="mt-5 mb-2 text-dark-blue text-sm"
				/>
				<Checkbox
					className="text-dark-blue text-sm"
					{...register("agreement")}
					label={t("agreement")}
				/>
			</div>
			<Button loading={loading} size="fluid">
				{t("signup")}
			</Button>
		</Form>
	);
};
export default SignupForm;
