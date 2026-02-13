import ThemeToggle from "./theme-toggle";
import LogoutButton from "./LogoutButton";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b px-6 h-16 bg-background">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
