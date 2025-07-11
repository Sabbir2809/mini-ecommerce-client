export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-green-400 animate-spin flex items-center justify-center border-t-green-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 animate-spin border-t-red-400 rounded-full" />
        </div>
        <p className="text-lg text-green-500">Loading...</p>
      </div>
    </div>
  );
}
