interface BadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "indigo";
}

export function Badge({ children, variant = "yellow" }: BadgeProps) {
  const bg = variant === "yellow" ? "bg-primary" : "bg-secondary text-white";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 ${bg} border-brutal text-xs font-extrabold uppercase tracking-wider shadow-brutal-sm`}
    >
      {children}
    </span>
  );
}
