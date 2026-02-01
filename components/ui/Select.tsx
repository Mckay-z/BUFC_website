/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import { Icon } from "@iconify/react";

// Debug statement
const DEBUG = process.env.NODE_ENV === "development";
const log = (...args: any[]) => DEBUG && console.log("[Select Component]", ...args);

export type SelectVariant = "default" | "filled";
export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: SelectVariant;
  size?: SelectSize;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
  selectClassName?: string;
  labelClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = "default",
      size = "md",
      label,
      error,
      helperText,
      fullWidth = false,
      required = false,
      options,
      placeholder,
      containerClassName = "",
      selectClassName = "",
      labelClassName = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    log("Rendering Select with props:", { variant, size, label, error, disabled, optionsCount: options.length });

    // Base select styles
    const baseSelectStyles = `
      font-medium transition-all duration-200
      focus:outline-none appearance-none cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed
      pr-10
    `;

    // Variant styles
    const variantStyles = {
      default: `
        bg-neutral-1 border-2 border-neutral-4
        text-neutral-text
        focus:border-primary focus:ring-2 focus:ring-primary/20
        ${error ? "!border-red-500 focus:!ring-red-500/20" : ""}
      `,
      filled: `
        bg-neutral-2 border-2 border-transparent
        text-neutral-text
        focus:bg-neutral-1 focus:border-primary focus:ring-2 focus:ring-primary/20
        ${error ? "!border-red-500 !bg-red-50 focus:!ring-red-500/20" : ""}
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-2 text-sm rounded-md",
      md: "px-4 py-2.5 text-base rounded-lg",
      lg: "px-5 py-3 text-lg rounded-lg",
    };

    // Width style
    const widthStyle = fullWidth ? "w-full" : "";

    // Combined select className
    const combinedSelectClassName = `
      ${baseSelectStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${widthStyle}
      ${selectClassName}
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

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {/* Label */}
        {label && (
          <label className={labelStyles} htmlFor={props.id || props.name}>
            {label}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          {/* Select Field */}
          <select
            ref={ref}
            disabled={disabled}
            className={combinedSelectClassName}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.id || props.name}-error`
                : helperText
                ? `${props.id || props.name}-helper`
                : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-6">
            <Icon icon="mdi:chevron-down" width="20" height="20" />
          </div>
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

Select.displayName = "Select";

export default Select;
