import { cn } from "@/utils/cn";

type InputTextProps = {
  inputName: string;
  inputLabel: string;
  inputDefaultValue?: string;
  inputOptions?: {
    label: string;
    value: string;
  }[];
  autocompleteName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const InputSelect = ({
  inputName,
  inputLabel,
  inputDefaultValue,
  inputOptions,
  className,
  autocompleteName,
  ...rest
}: InputTextProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...rest}>
      <label htmlFor={inputName}>{inputLabel}</label>
      <select
        name={inputName}
        id={inputName}
        autoComplete={autocompleteName}
        className="tw-select rounded-md border border-neutral-100 bg-transparent px-2 !outline-none"
        defaultValue={inputDefaultValue}
      >
        {inputOptions?.flatMap((option, index) => (
          <option key={index} value={option.value} className="bg-neutral-950">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
