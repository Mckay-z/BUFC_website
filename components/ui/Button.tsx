import React from "react";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonClassName?: string;
  textClassName?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "sm",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  href,
  onClick,
  type = "button",
  buttonClassName = "",
  textClassName = "",
}: ButtonProps) {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center gap-2    
    font-medium transition-all duration-200 
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none cursor-pointer
  `;

  // Variant styles
  const variantStyles = {
    primary: `
      bg-primary text-neutral-1
      hover:bg-primary-hover 
      active:bg-primary-active
      shadow-sm hover:shadow-md
    `,
    outline: `
      bg-transparent border-2 border-primary text-primary
      hover:bg-primary hover:text-neutral-1
      active:bg-primary-active
    `,
    ghost: `
      bg-transparent text-neutral-text
      hover:text-primary
      active:text-primary-active
    `,
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-4.5 py-2.5 sm:px-5 xs:py-3 text-[13.5px] md:text-sm xl:text-[15px] rounded-full",
    lg: "px-6 py-4 text-base rounded-full",
  };

  // Width style
  const widthStyle = fullWidth ? "w-full" : "";

  // Combined className
  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyle}
    ${buttonClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Button content
  const content = (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span className={textClassName}>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </>
  );

  // Render as Link if href is provided
  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClassName}
    >
      {content}
    </button>
  );
}
