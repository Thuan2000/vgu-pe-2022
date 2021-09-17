import React from "react";
import { useTranslation } from "react-i18next";

import Form from "./form";

// React-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// UI
import Button from "./ui/button";
import Input from "./ui/input";
import Checkbox from "./ui/checkbox";
import Link from "./ui/link";
import { LoginMutation, useLoginMutation } from "../graphql/auth.graphql";
import { setAuthCredentials } from "../utils/auth-utils";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "../utils/routes";
import PasswordInput from "./ui/password-input";
import EmailOutlineIcon from "@assets/icons/email-outline-icon";
import SocialLogin from "./social-login";

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
	password: yup.string().required("form:password-required-error")
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(loginSchema)
	});
	const router = useRouter();

	const { t } = useTranslation("form");
	const [login, { loading }] = useLoginMutation({
		onError: (err) => console.log(err),
		onCompleted: onLoginComplete
	});

	function onLoginComplete({ login }: LoginMutation) {
		const { success, message, token, role } = login;
		if (success) {
			// Set auth cred
			setAuthCredentials(token!, role!);
			// Redirect to homepage
			router.replace(ROUTES.HOMEPAGE);
			return;
		}

		alert(t(message || ""));
	}

	async function onSubmit({ email, password }: FormValues) {
		login({
			variables: {
				input: {
					email,
					password
				}
			}
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
						{...register("password")}
						className="mb-5"
						label={`${t("password-label")}*`}
						placeholder={t("password-placeholder")}
						variant="outline"
						type="password"
						error={t(errors?.password?.message || "")}
					/>
					<Button loading={loading} size="small" className="w-full">
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
						className="text-xs text-blue-secondary"
						href="/forget-password"
					>
						{t("forget-password")}
					</Link>
				</div>
			</Form>
			<SocialLogin />
		</>
	);
};
export default LoginForm;
