// components/ui/ImageFallback.tsx
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils"; // or your utility function for classnames

interface ImageFallbackProps {
  icon?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  iconClassName?: string;
}

export default function ImageFallback({
  icon = "material-symbols:news",
  width = "50",
  height = "50",
  className = "",
  iconClassName = "text-neutral-6",
}: ImageFallbackProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
    >
      <Icon
        icon={icon}
        width={width}
        height={height}
        className={iconClassName}
      />
    </div>
  );
}
