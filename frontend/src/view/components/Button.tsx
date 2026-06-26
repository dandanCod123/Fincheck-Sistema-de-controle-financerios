import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-teal-600 hover:bg-teal-700 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all",
      )}
    />
  );
}
