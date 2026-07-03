"use client";

import { ButtonHTMLAttributes } from "react";
import { ButtonVariant, buttonClassName } from "./button-styles";

export function Button({
  variant = "primary",
  iconOnly = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; iconOnly?: boolean }) {
  return (
    <button className={buttonClassName({ variant, iconOnly, className })} {...props} />
  );
}
