"use client";

import ThemeToggle from "./theme-toggle";
import LogoutButton from "./LogoutButton";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 backdrop-blur-xl bg-purple-900/20">
      <h1 className="text-lg font-semibold text-purple-200">Dashboard</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
