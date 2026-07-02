import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { capitalizeFirstLetter } from "../../app/utils/capitalizeFirstLetter";

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        month_caption: "flex items-center justify-between px-1 mb-2 relative",
        caption_label: "text-lg font-medium text-gray-800",
        nav: "flex gap-4 items-center !static",
        button_previous:
          "text-teal-700 flex items-center justify-center !bg-transparent hover:!text-teal-900",
        button_next:
          "text-teal-700 flex items-center justify-center !bg-transparent hover:!text-teal-900",
        weekday: "uppercase text-xs text-gray-400 font-medium pt-1 pb-2",
        day: "p-0.5",
        day_button:
          "text-gray-600 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full flex items-center justify-center transition-colors",
      }}
      modifiersClassNames={{
        today: "font-bold text-gray-900",
        selected:
          "!bg-teal-700 !rounded-full [&>button]:!text-white [&>button]:font-semibold [&>button]:hover:!bg-teal-700",
      }}
      formatters={{
        formatCaption: (date, options) => {
          return capitalizeFirstLetter(format(date, "LLLL yyyy", options));
        },
      }}
    />
  );
}
