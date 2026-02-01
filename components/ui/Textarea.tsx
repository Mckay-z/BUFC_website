/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";

// Debug statement
const DEBUG = process.env.NODE_ENV === "development";
const log = (...args: any[]) => DEBUG && console.log("[Textarea Component]", ...args);

export type TextareaVariant = "default" | "filled";
export type TextareaSize = "sm" | "md" | "lg";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  containerClassName?: string;
  textareaClassName?: string;
  labelClassName?: string;
  minRows?: number;
  maxRows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "default",
      size = "md",
      label,
      error,
      helperText,
      fullWidth = false,
      required = false,
      containerClassName = "",
      textareaClassName = "",
      labelClassName = "",
      disabled = false,
      rows = 4,
      minRows,
      maxRows,
      ...props
    },
    ref
  ) => {
    log("Rendering Textarea with props:", { variant, size, label, error, disabled, rows });

    // Base textarea styles
    const baseTextareaStyles = `
      font-medium transition-all duration-200
      focus:outline-none resize-y
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
    };

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-2 text-sm rounded-md",
      md: "px-4 py-2.5 text-base rounded-lg",
      lg: "px-5 py-3 text-lg rounded-lg",
    };

    // Width style
    const widthStyle = fullWidth ? "w-full" : "";

    // Combined textarea className
    const combinedTextareaClassName = `
      ${baseTextareaStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${widthStyle}
      ${textareaClassName}
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

    // Calculate dynamic rows based on minRows and maxRows
    const dynamicRows = minRows && rows < minRows ? minRows : maxRows && rows > maxRows ? maxRows : rows;

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {/* Label */}
        {label && (
          <label className={labelStyles} htmlFor={props.id || props.name}>
            {label}
          </label>
        )}

        {/* Textarea Field */}
        <textarea
          ref={ref}
          disabled={disabled}
          rows={dynamicRows}
          className={combinedTextareaClassName}
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

Textarea.displayName = "Textarea";

export default Textarea;
