import { clsx } from "clsx";
import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";

export function Card({
  children,
  className,
  padded = true,
}: PropsWithChildren<{ className?: string; padded?: boolean }>) {
  return (
    <div className={clsx("card", padded && "p-5", className)}>{children}</div>
  );
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "soft" | "dark";
}) {
  return (
    <button
      className={clsx(
        "inline-flex h-10 items-center justify-center gap-2 rounded-[12px] px-4 text-sm font-semibold transition-all duration-200 ease-[var(--ease)] disabled:opacity-50",
        variant === "primary" && "bg-brand text-white shadow-[0_6px_16px_rgba(15,159,134,.28)] hover:brightness-105 active:scale-[0.98]",
        variant === "dark" && "bg-slate text-white hover:brightness-110 active:scale-[0.98]",
        variant === "ghost" && "bg-transparent text-ink-muted hover:bg-surface-2 hover:text-ink",
        variant === "soft" && "bg-brand-soft text-brand-ink hover:brightness-98",
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-ink outline-none transition duration-200 placeholder:text-ink-muted focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-soft)]",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  children,
  tone = "neutral",
}: PropsWithChildren<{ tone?: "neutral" | "success" | "warn" | "danger" | "brand" }>) {
  const tones = {
    neutral: "bg-surface-2 text-ink-muted",
    success: "bg-[color-mix(in_oklab,var(--success)_14%,white)] text-success",
    warn: "bg-[color-mix(in_oklab,var(--warn)_14%,white)] text-warn",
    danger: "bg-[color-mix(in_oklab,var(--danger)_14%,white)] text-danger",
    brand: "bg-brand-soft text-brand-ink",
  };
  return (
    <span className={clsx("inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold", tones[tone])}>
      {children}
    </span>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[18px] border border-dashed border-line bg-surface-2/60 px-6 py-16 text-center">
      <p className="text-base font-semibold text-ink">{title}</p>
      <p className="max-w-sm text-sm text-ink-muted">{body}</p>
    </div>
  );
}

export function IconTile({
  children,
  tone = "brand",
}: PropsWithChildren<{ tone?: "brand" | "accent" | "slate" | "danger" | "success" }>) {
  const map = {
    brand: "bg-brand-soft text-brand-ink",
    accent: "bg-accent-soft text-accent",
    slate: "bg-[#E8ECEA] text-slate",
    danger: "bg-[color-mix(in_oklab,var(--danger)_12%,white)] text-danger",
    success: "bg-[color-mix(in_oklab,var(--success)_12%,white)] text-success",
  };
  return (
    <span className={clsx("grid h-10 w-10 place-items-center rounded-[12px]", map[tone])}>
      {children}
    </span>
  );
}
