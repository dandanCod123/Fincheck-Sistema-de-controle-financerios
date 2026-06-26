import { forwardRef, type ComponentProps } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  erro?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, id, name, erro, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            clsx(
              " bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
              erro && "!border-red-600",
            ),
          )}
          placeholder=" "
        />

        <label
          htmlFor={inputId}
          className="
          absolute text-xs left-[13px] top-2 pointer-events-none
          text-gray-700 transition-all
          peer-placeholder-shown:text-base
          peer-placeholder-shown:top-3.5
        "
        >
          {placeholder}
        </label>
        {erro && (
          <div className="flex gap-2 items-center mt-2 text-red-600">
            <CrossCircledIcon />
            <span className=" text-xs">{erro}</span>
          </div>
        )}
      </div>
    );
  },
);
