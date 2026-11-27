const ProductSkeleton = () => (
  <div className="wrapper pt-14">
    <div className="h-8 w-44 rounded bg-gray-200 animate-pulse" />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-72 rounded-lg bg-gray-200 animate-pulse" />
      ))}
    </div>
  </div>
);

export default ProductSkeleton;
