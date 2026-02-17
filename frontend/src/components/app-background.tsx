export default function AppBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-purple-800 dark:from-[#0b0620] dark:via-[#140a35] dark:to-[#1a1045]">
      {children}
    </div>
  );
}
