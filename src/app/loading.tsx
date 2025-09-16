export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="w-full h-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mt-3 animate-pulse" />
            <div className="h-3 w-1/2 bg-gray-200 rounded mt-2 animate-pulse" />
            <div className="h-3 w-1/3 bg-gray-200 rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
