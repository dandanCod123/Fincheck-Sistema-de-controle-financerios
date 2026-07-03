import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  errors?: string;
  onChange?(value: string): void;
  value?: number | string;
}

export function InputCurrency({ errors, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        className={cn(
          "text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full dark:bg-gray-700 dark:text-white",
          errors && "text-red-900",
        )}
        onChange={(event) => onChange?.(event.target.value)}
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        defaultValue="0,00"
      />
      {errors && (
        <div className="flex gap-2 items-center mt-2 text-red-600">
          <CrossCircledIcon />
          <span className=" text-xs">{errors}</span>
        </div>
      )}
    </div>
  );
}
