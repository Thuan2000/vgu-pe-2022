import React from "react";

const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (props.onSubmit) props?.onSubmit(e);
	}

	return (
		<form onSubmit={handleSubmit} {...props}>
			{props.children}
		</form>
	);
};
export default Form;
