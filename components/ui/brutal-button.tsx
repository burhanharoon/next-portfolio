import Link from "next/link";

interface BrutalButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  shadow?: "yellow" | "indigo" | "black";
  className?: string;
  [key: `data-${string}`]: string | undefined;
}

export function BrutalButton({
  children,
  href,
  onClick,
  variant = "primary",
  shadow = "black",
  className = "",
  ...rest
}: BrutalButtonProps) {
  const base =
    "inline-flex items-center px-6 py-3 border-brutal text-sm font-extrabold transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

  const variants = {
    primary: "bg-text-primary text-white",
    secondary: "bg-white text-text-primary",
    ghost: "bg-transparent text-white border-[#444]",
  };

  const shadows = {
    yellow: "shadow-brutal-yellow",
    indigo: "shadow-brutal-indigo",
    black: "shadow-brutal",
  };

  const classes = `${base} ${variants[variant]} ${shadows[shadow]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
