import React from "react";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtext?: string;
  onColor?: boolean;
  showLine?: boolean;
  uppercase?: boolean;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtext,
  onColor = false,
  showLine = false,
  uppercase = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between w-full md:h-11 gap-4 font-montserrat ${className}`}
      {...props}
      style={{ opacity: 1, ...props.style }}
    >
      {/* Left Group: Title + Supporting Line */}
      <div className="flex items-center gap-6">
        <h2
          className={`text-[20px] font-semibold leading-none tracking-normal whitespace-nowrap ${uppercase ? "uppercase" : ""} ${onColor ? "text-white" : "text-neutral-9"}`}
        >
          {title}
        </h2>
        {showLine && (
          <span
            className={`h-0.5 w-24 md:w-32 lg:w-48 xl:w-64 ${onColor ? "bg-white/30" : "bg-[#3F2A78]"
              }`}
          />
        )}
      </div>

      {/* Right Group: Subtext / Metadata */}
      {(subtext || children) && (
        <div className="flex flex-col gap-3 md:max-w-md lg:max-w-lg xl:max-w-2xl">
          {subtext && (
            <p
              className={`text-[18px] font-normal leading-none text-left md:text-right tracking-normal ${onColor ? "text-white/70" : "text-neutral-6"
                }`}
            >
              {subtext}
            </p>
          )}
          {children && (
            <div className="flex justify-start md:justify-end">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
