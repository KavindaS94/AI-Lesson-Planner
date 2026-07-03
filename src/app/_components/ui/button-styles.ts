export type ButtonVariant = "primary" | "secondary" | "danger";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus-visible:ring-blue-500 disabled:bg-blue-300",
  secondary:
    "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:ring-blue-500 disabled:text-gray-400",
  danger:
    "text-gray-400 hover:bg-red-50 hover:text-red-600 focus-visible:ring-red-500 disabled:text-gray-300",
};

export function buttonClassName({
  variant = "primary",
  iconOnly = false,
  className = "",
}: {
  variant?: ButtonVariant;
  iconOnly?: boolean;
  className?: string;
}) {
  return `inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
    iconOnly ? "h-9 w-9 shrink-0 text-base" : "px-4 py-2 text-sm"
  } ${VARIANT_CLASSES[variant]} ${className}`;
}
