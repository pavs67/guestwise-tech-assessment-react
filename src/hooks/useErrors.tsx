import { useState } from "react";

export type IError = {
  field: string;
  message: string;
};

export type IUpdateError = (type: "add" | "remove", field: string, message?: string) => void;

const useErrors = () => {
  const [errors, setErrors] = useState<IError[]>([]);

  const resetErrors = () => {
    setErrors([]);
  };

  const handleUpdateErrors: IUpdateError = (type, field, message) => {
    if (type === "add") {
      if (errors.some((i) => i.field === field) === false) {
        setErrors((curr) => [...curr, { field: field, message: message || "" }]);
      }
    }

    if (type === "remove") {
      setErrors((curr) => curr.filter((i) => i.field !== field));
    }
  };

  return { errors, handleUpdateErrors, resetErrors };
};

export const scrollToError = () => {
  const wcError = document.getElementsByClassName("gw-error");

  if (wcError.length > 0) {
    wcError[0].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
};

export const errorCss = (field: string, errors: IError[]) =>
  errors.length > 0 && errors.some((i) => i.field === field) ? "gw-error" : "";

export const ErrorMessage = ({ field, errors }: { field: string; errors: IError[] }) => {
  if (errors.length > 0 && errors.findIndex((i) => i.field === field) > -1) {
    return <div className="gw-error-message">{errors.find((i) => i.field === field)?.message}</div>;
  }

  return null;
};

export default useErrors;
