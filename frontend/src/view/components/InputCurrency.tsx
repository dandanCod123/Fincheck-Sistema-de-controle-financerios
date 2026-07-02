import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;

  onChange?(value: string | undefined): void;

  value: number | string;
}

export function InputCurrency() {
  return (
    <div>
      <NumericFormat
        className="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] w-full bg-transparent border-none focus:outline-none"
        thousandSeparator="."
        decimalSeparator=","
        defaultValue="0,00"
      />
    </div>
  );
}
