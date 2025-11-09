const ProductLoading = () => {
  return (
    <div className="container max-w-7xl space-y-10 pt-12 animate-pulse">
      {/* Top Section: Images + Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image Gallery Skeleton */}
        <div className="sm:px-16 md:px-0 lg:px-20 xl:px-20 space-y-4">
          <div className="bg-gray-300 rounded-lg h-[350px]" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-lg h-20" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col space-y-4 px-4">
          <div className="h-8 bg-gray-300 rounded w-3/4" />
          <div className="h-5 bg-gray-300 rounded w-1/3" />
          <div className="h-20 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded w-1/2" />
          <hr className="bg-gray-300 my-6" />
          <div className="space-y-2 w-2/3">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center mt-10 gap-4">
            <div className="w-full h-12 bg-gray-300 rounded" />
            <div className="w-full h-12 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-16">
          <div className="h-8 w-48 bg-gray-300 rounded" />
          <div className="w-28 h-1 bg-gray-300 mt-2 rounded" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-64 bg-gray-300 rounded-lg" />
          ))}
        </div>

        <div className="h-10 w-32 bg-gray-300 rounded mb-16" />
      </div>
    </div>
  );
};

export default ProductLoading;
