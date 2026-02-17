"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthBackground({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-indigo-900 to-purple-950">
      {children}
    </div>
  );
}
