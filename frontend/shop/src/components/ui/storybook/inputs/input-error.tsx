import React from "react";

const InputErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return <></>;

  return <p className="my-2 text-xs text-start text-red-500">{error}</p>;
};
export default InputErrorMessage;
