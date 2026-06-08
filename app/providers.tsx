"use client";
import { ToastProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider placement="bottom end" />
      {children}
    </>
  );
}
