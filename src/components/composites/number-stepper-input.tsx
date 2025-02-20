import { Button, Input } from "@ui";
import { Minus, Plus } from "lucide-react";

interface NumberStepperInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export default function NumberStepperInput({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  className,
}: NumberStepperInputProps) {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className={`flex w-full items-center gap-3 ${className}`}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0"
        onClick={decrement}
        disabled={value <= min || disabled}
        aria-label="순서 감소"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min={min}
        max={max}
        readOnly
        className="grow text-center"
        value={value}
        disabled={disabled}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0"
        onClick={increment}
        disabled={value >= max || disabled}
        aria-label="순서 증가"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
