"use client";

import InputText from "./InputText";

type InputTextProps = {
  inputName: string;
  inputLabel: string;
  autocompleteName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const InputPasswordConfirm = ({
  inputName,
  inputLabel,
  autocompleteName,
  ...rest
}: InputTextProps) => {
  return (
    <InputText
      inputName={inputName}
      inputLabel={inputLabel}
      inputType="password"
      autocompleteName={autocompleteName}
      onPaste={(e) => e.preventDefault()}
      {...rest}
    />
  );
};

export default InputPasswordConfirm;
