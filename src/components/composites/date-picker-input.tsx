import { cn } from "@/lib/utils";
import {
  Button,
  CalendarCustom,  FormControl,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerInput({
  value,
  onChange,
  placeholder = "날짜 선택",
  disabled,
  minDate,
  maxDate,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            {value ? (
              format(value, "PPP", { locale: ko })
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarCustom
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => {
            const beforeMinDate = minDate && date < minDate;
            const afterMaxDate = maxDate && date > maxDate;
            return beforeMinDate || afterMaxDate || false;
          }}
          initialFocus
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
}
