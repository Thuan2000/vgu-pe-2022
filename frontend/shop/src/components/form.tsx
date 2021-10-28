import React from "react";

const Form = ({
  onSubmit,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {props.children}
    </form>
  );
};
export default Form;
