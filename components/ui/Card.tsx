/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// Debug statement
const DEBUG = process.env.NODE_ENV === "development";
const log = (...args: any[]) => DEBUG && console.log("[Card Component]", ...args);

export type CardVariant = "default" | "outlined" | "elevated" | "ghost";
export type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
  cardClassName?: string;
}

export default function Card({
  variant = "default",
  padding = "md",
  hoverable = false,
  clickable = false,
  children,
  cardClassName = "",
  ...props
}: CardProps) {
  log("Rendering Card with props:", { variant, padding, hoverable, clickable });

  // Base card styles
  const baseStyles = `
    rounded-lg transition-all duration-200
    ${clickable ? "cursor-pointer" : ""}
  `;

  // Variant styles
  const variantStyles = {
    default: `
      bg-neutral-1 border border-neutral-3
      ${hoverable ? "hover:shadow-md hover:border-neutral-4" : ""}
    `,
    outlined: `
      bg-transparent border-2 border-neutral-4
      ${hoverable ? "hover:border-primary hover:shadow-sm" : ""}
    `,
    elevated: `
      bg-neutral-1 shadow-md border-none
      ${hoverable ? "hover:shadow-lg hover:-translate-y-0.5" : ""}
    `,
    ghost: `
      bg-transparent border-none
      ${hoverable ? "hover:bg-neutral-2" : ""}
    `,
  };

  // Padding styles
  const paddingStyles = {
    none: "p-0",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-5 md:p-6",
    lg: "p-5 sm:p-6 md:p-8",
  };

  // Combined className
  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${cardClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
