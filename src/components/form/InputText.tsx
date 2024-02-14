import { cn } from "@/utils/cn";

type InputTextProps = {
  inputName: string;
  inputLabel: string;
  inputType?: string;
  autocompleteName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const InputText = ({
  inputName,
  inputLabel,
  inputType = "text",
  className,
  autocompleteName,
  ...rest
}: InputTextProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...rest}>
      <label htmlFor={inputName}>{inputLabel}</label>
      <input
        name={inputName}
        id={inputName}
        autoComplete={autocompleteName}
        type={inputType}
        className="rounded-md border border-neutral-100 bg-transparent px-2 !outline-none"
      />
    </div>
  );
};

export default InputText;
