"use client";

import { cn } from "@/lib/utils";
import * as RadixSlider from "@radix-ui/react-slider"

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
  className?: string
}

const SlideBar: React.FC<SlideProps> = ({
  value = 1,
  onChange,
  className
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className={cn("relative flex items-center select-none touch-none w-full h-10", className)}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className="
        bg-secondary
          relative 
          grow 
          rounded-full 
          h-[3px]
        "
      >
        <RadixSlider.Range
          className="
            absolute 
            bg-primary
            rounded-full 
            h-full
          "
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}

export default SlideBar;