"use client";

import ThemeToggle from "./theme-toggle";
import LogoutButton from "./LogoutButton";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <h1 className="font-semibold text-lg text-purple-200">Dashboard</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
