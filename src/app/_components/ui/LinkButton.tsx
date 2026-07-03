import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
import { ButtonVariant, buttonClassName } from "./button-styles";

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { variant?: ButtonVariant }) {
  return <Link className={buttonClassName({ variant, className })} {...props} />;
}
