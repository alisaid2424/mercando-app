import { formatCurrency } from "@/lib/formatters";
import { OrderWithProduct } from "@/types/product";
import Image from "next/image";

interface OrderItemsWithProduct {
  order: OrderWithProduct;
}

const OrderItems = ({ order }: OrderItemsWithProduct) => {
  return (
    <section
      aria-labelledby="order-details-heading"
      className="mx-auto max-w-4xl px-4 py-8"
    >
      <h1
        id="order-details-heading"
        className="mb-6 text-center text-2xl font-bold capitalize italic text-primary"
      >
        Order Details
      </h1>

      <ul aria-label="Order items" className="space-y-6">
        {order.products.map((item) => {
          const itemSubtotal = item.product.offerPrice * item.quantity;

          return (
            <li key={item.id}>
              <article className="rounded-lg border p-4">
                <div className="flex flex-wrap gap-6 sm:flex-nowrap">
                  <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden sm:mx-0">
                    <Image
                      src={item.product.images[0] || "/box_icon.svg"}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="h-full w-full rounded-full object-contain sm:rounded-lg"
                    />
                  </div>

                  <div className="flex w-full items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">
                        {item.product.name}
                      </h2>

                      <div className="mt-1 flex flex-wrap items-start justify-between gap-2 text-sm text-gray-600 sm:justify-around">
                        <div className="space-y-1">
                          <p>
                            Unit price:{" "}
                            <span>
                              {formatCurrency(item.product.offerPrice)}
                            </span>
                          </p>
                          <p>Category: {item.product.category.name}</p>
                        </div>

                        <span aria-hidden="true">×</span>

                        <p className="text-sm font-medium">
                          Quantity: <strong>{item.quantity}</strong>
                        </p>
                      </div>
                    </div>

                    <p
                      aria-label={`Subtotal for ${item.product.name}`}
                      className="text-lg font-semibold"
                    >
                      {formatCurrency(itemSubtotal)}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 border-t pt-4 text-right">
        <p className="text-lg font-medium">
          Total:
          <strong className="ml-2">{formatCurrency(order.amount)}</strong>
        </p>
      </div>
    </section>
  );
};

export default OrderItems;
