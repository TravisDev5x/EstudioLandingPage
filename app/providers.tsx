"use client";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider placement="bottom end" />
      {children}
    </SessionProvider>
  );
}
