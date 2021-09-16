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
import { useLoginMutation } from "../graphql/auth.graphql";
import { setAuthCredentials } from "../utils/auth-utils";

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

	const { t } = useTranslation("form");
	const [login, { loading, error }] = useLoginMutation({
		onError: (err) => console.log(err),
		onCompleted: ({ login }) => {
			const { success, message, token, permissions } = login;
			if (success) {
				// Set auth cred
				setAuthCredentials(token as string, permissions);
				// Redirect to homepage
				return;
			}

			alert(t(message || ""));
		}
	});

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
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-3">
				<Input
					{...register("email")}
					className="mt-7 mb-5"
					label={`${t("email-label")}*`}
					placeholder={t("email-placeholder")}
					error={t(errors?.email?.message || "")}
				/>
				<Input
					{...register("password")}
					className="mb-5"
					label={`${t("password-label")}*`}
					placeholder={t("password-placeholder")}
					type="password"
					error={t(errors?.password?.message || "")}
				/>
				<Button size="small" className="w-full">
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
	);
};
export default LoginForm;
