export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="aspect-[3/4] bg-[#DDDDDD] rounded-sm" />
      <div className="h-4 w-2/3 bg-[#DDDDDD] rounded-sm" />
      <div className="h-4 w-1/3 bg-[#DDDDDD] rounded-sm" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
