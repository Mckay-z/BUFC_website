/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import { Icon } from "@iconify/react";

// Debug statement
const DEBUG = process.env.NODE_ENV === "development";
const log = (...args: any[]) => DEBUG && console.log("[Checkbox Component]", ...args);

export type CheckboxSize = "sm" | "md" | "lg";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: CheckboxSize;
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  checkboxClassName?: string;
  labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      label,
      error,
      helperText,
      containerClassName = "",
      checkboxClassName = "",
      labelClassName = "",
      disabled = false,
      checked,
      ...props
    },
    ref
  ) => {
    log("Rendering Checkbox with props:", { size, label, error, disabled, checked });

    // Base checkbox styles
    const baseCheckboxStyles = `
      appearance-none cursor-pointer transition-all duration-200
      border-2 border-neutral-4 rounded
      checked:bg-primary checked:border-primary
      focus:outline-none focus:ring-2 focus:ring-primary/20
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? "!border-red-500" : ""}
    `;

    // Size styles
    const sizeStyles = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    // Combined checkbox className
    const combinedCheckboxClassName = `
      ${baseCheckboxStyles}
      ${sizeStyles[size]}
      ${checkboxClassName}
    `
      .trim()
      .replace(/\s+/g, " ");

    // Label styles
    const labelStyles = `
      text-neutral-text cursor-pointer select-none
      ${size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${labelClassName}
    `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className={containerClassName}>
        <div className="flex items-start gap-2">
          {/* Hidden Native Checkbox */}
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            className="sr-only peer"
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

          {/* Custom Checkbox Visual */}
          <label
            htmlFor={props.id || props.name}
            className={`
              relative flex items-center justify-center
              ${combinedCheckboxClassName}
            `}
          >
            {checked && (
              <Icon
                icon="mdi:check"
                className={`text-neutral-1 ${
                  size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"
                }`}
              />
            )}
          </label>

          {/* Label Text */}
          {label && (
            <label htmlFor={props.id || props.name} className={labelStyles}>
              {label}
            </label>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            className="mt-1.5 text-sm text-red-500 ml-7"
            id={`${props.id || props.name}-error`}
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            className="mt-1.5 text-sm text-neutral-6 ml-7"
            id={`${props.id || props.name}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
