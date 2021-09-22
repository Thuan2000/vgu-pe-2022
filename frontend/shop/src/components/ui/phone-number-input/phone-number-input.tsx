import React, { InputHTMLAttributes } from "react";
import cn from "classnames";
import PhoneInput from "react-phone-number-input";
import Styles from "./phone-number-input.module.css";
import "react-phone-number-input/style.css";
import { Controller } from "react-hook-form";

export interface IPhoneNumberInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	inputClassName?: string;
	label?: string;
	note?: string;
	error?: string;
	type?: string;
	shadow?: boolean;
	placeholder?: string;
	ref?: any;
	variant?: "normal" | "solid" | "outline";
	control: any;
	name: string;
}
const classes = {
	root: "px-4 h-10 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
	normal: "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
	solid: "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
	outline: "border border-border-base focus:border-accent",
	shadow: "focus:shadow"
};

const PhoneNumberInput = React.forwardRef<
	HTMLInputElement,
	IPhoneNumberInputProps
>(
	({
		className,
		label,
		note,
		name,
		error,
		control,
		placeholder,
		variant = "normal",
		shadow = false,
		type = "text",
		inputClassName
	}) => {
		const rootClassName = cn(
			classes.root,
			{
				[classes.normal]: variant === "normal",
				[classes.solid]: variant === "solid",
				[classes.outline]: variant === "outline"
			},
			{
				[classes.shadow]: shadow
			},
			inputClassName
		);

		return (
			<div className={className}>
				<label
					htmlFor={name}
					className="block text-body-dark font-semibold text-md leading-none mb-3"
				>
					{label}
				</label>
				<Controller
					name={name || ""}
					control={control}
					render={({ field: { onChange, value, name, ref } }) => (
						<PhoneInput
							international
							defaultCountry="VN"
							ref={ref}
							id={name}
							name={name}
							type={type}
							placeholder={placeholder}
							style={{ outline: "none" }}
							className={`${Styles.input} ${rootClassName}`}
							aria-invalid={error ? "true" : "false"}
							onChange={(e) => onChange(e)}
							value={value}
						/>
					)}
				/>

				{note && <p className="mt-2 text-xs text-body">{note}</p>}
				{error && (
					<p className="my-2 text-xs text-start text-red-500">
						{error}
					</p>
				)}
			</div>
		);
	}
);

export default PhoneNumberInput;
