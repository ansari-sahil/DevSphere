export default function BackgroundGradient() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-linear-to-br from-purple-200 via-purple-100 to-white dark:from-purple-950 dark:via-purple-900 dark:to-black" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20" />
    </div>
  );
}
