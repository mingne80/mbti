import type { ButtonHTMLAttributes } from "react";

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        "inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#265B5F] disabled:cursor-not-allowed disabled:opacity-50",
        props.className ?? ""
      ].join(" ")}
    />
  );
}
