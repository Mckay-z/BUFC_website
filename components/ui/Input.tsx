/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";

// Debug statement
const DEBUG = process.env.NODE_ENV === "development";
const log = (...args: any[]) => DEBUG && console.log("[Input Component]", ...args);

export type InputVariant = "default" | "filled" | "underline";
export type InputSize = "sm" | "md" | "lg";
export type InputType = "text" | "email" | "tel" | "password" | "number" | "url" | "search";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  inputType?: InputType;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      required = false,
      inputType = "text",
      containerClassName = "",
      inputClassName = "",
      labelClassName = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    log("Rendering Input with props:", { variant, size, label, error, disabled });

    // Base input styles
    const baseInputStyles = `
      font-medium transition-all duration-200
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    // Variant styles
    const variantStyles = {
      default: `
        bg-neutral-1 border-2 border-neutral-4
        text-neutral-text placeholder:text-neutral-6
        focus:border-primary focus:ring-2 focus:ring-primary/20
        ${error ? "!border-red-500 focus:!ring-red-500/20" : ""}
      `,
      filled: `
        bg-neutral-2 border-2 border-transparent
        text-neutral-text placeholder:text-neutral-6
        focus:bg-neutral-1 focus:border-primary focus:ring-2 focus:ring-primary/20
        ${error ? "!border-red-500 !bg-red-50 focus:!ring-red-500/20" : ""}
      `,
      underline: `
        bg-transparent border-b-2 border-neutral-4
        text-neutral-text placeholder:text-neutral-6
        focus:border-primary
        rounded-none
        ${error ? "!border-red-500" : ""}
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-2 text-sm rounded-md",
      md: "px-4 py-2.5 text-base rounded-lg",
      lg: "px-5 py-3 text-lg rounded-lg",
    };

    // Adjust padding for icons
    const iconPaddingStyles = leftIcon
      ? size === "sm"
        ? "pl-10"
        : size === "md"
        ? "pl-12"
        : "pl-14"
      : "";

    const rightIconPaddingStyles = rightIcon
      ? size === "sm"
        ? "pr-10"
        : size === "md"
        ? "pr-12"
        : "pr-14"
      : "";

    // Width style
    const widthStyle = fullWidth ? "w-full" : "";

    // Combined input className
    const combinedInputClassName = `
      ${baseInputStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${iconPaddingStyles}
      ${rightIconPaddingStyles}
      ${widthStyle}
      ${inputClassName}
    `
      .trim()
      .replace(/\s+/g, " ");

    // Label styles
    const labelStyles = `
      block text-sm font-medium text-neutral-text mb-1.5
      ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""}
      ${labelClassName}
    `
      .trim()
      .replace(/\s+/g, " ");

    // Icon container styles
    const iconContainerStyles = `
      absolute top-1/2 -translate-y-1/2
      flex items-center justify-center
      text-neutral-6 pointer-events-none
      ${
        size === "sm"
          ? "w-5 h-5"
          : size === "md"
          ? "w-6 h-6"
          : "w-7 h-7"
      }
    `;

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {/* Label */}
        {label && (
          <label className={labelStyles} htmlFor={props.id || props.name}>
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={`${iconContainerStyles} ${
                size === "sm" ? "left-3" : size === "md" ? "left-4" : "left-5"
              }`}
            >
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={combinedInputClassName}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.id || props.name}-error`
                : helperText
                ? `${props.id || props.name}-helper`
                : undefined
            }
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div
              className={`${iconContainerStyles} ${
                size === "sm" ? "right-3" : size === "md" ? "right-4" : "right-5"
              }`}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            className="mt-1.5 text-sm text-red-500"
            id={`${props.id || props.name}-error`}
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            className="mt-1.5 text-sm text-neutral-6"
            id={`${props.id || props.name}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
