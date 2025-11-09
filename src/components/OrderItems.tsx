import { formatCurrency } from "@/lib/formatters";
import { OrderWithProduct } from "@/types/product";

import Image from "next/image";

interface OrderItemsWithProduct {
  order: OrderWithProduct;
}

const OrderItems = ({ order }: OrderItemsWithProduct) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl text-center text-primary font-bold mb-6 capitalize italic">
        Order Details
      </h1>

      <ul className="space-y-6">
        {order.products.map((item) => {
          return (
            <li key={item.id} className="border rounded-lg p-4">
              <div className="flex gap-6 flex-wrap sm:flex-nowrap">
                <div className="relative w-24 h-24 mx-auto sm:mx-0 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-contain w-full h-full rounded-full sm:rounded-lg "
                  />
                </div>

                <div className="flex justify-between items-start w-full">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      {item.product.name}
                    </h4>

                    <div className="flex items-start justify-between sm:justify-around flex-wrap gap-2 mt-1 text-sm text-gray-600 ">
                      <div className="space-y-1">
                        <div>
                          Unit price : {formatCurrency(item.product.offerPrice)}
                        </div>
                        <div>Category : {item.product.category.name}</div>
                      </div>
                      x
                      <div className="font-medium text-sm">
                        Quantity: <strong>{item.quantity}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-lg font-semibold">
                    {formatCurrency(item.product?.offerPrice * item.quantity)}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 border-t pt-4 text-right ">
        <p className="font-medium text-lg">
          Total:
          <strong className=" ml-2">{formatCurrency(order.amount)}</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderItems;
