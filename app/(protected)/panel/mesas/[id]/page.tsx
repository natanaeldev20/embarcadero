import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CloseOrderButton } from "@/modules/order/components/CloseOrderButton";
import { ProductsOrder } from "@/modules/order/components/ProductsOrder";
import { getOrCreateOrderAction } from "@/modules/order/server-actions/order.action";
import { getProducts } from "@/modules/product/server-actions/product.action";
import { getTable } from "@/modules/table/server-actions/table.action";

export default async function TablePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [table, orderResponse, productsResponse] = await Promise.all([
    getTable(id),
    getOrCreateOrderAction(id),
    getProducts(),
  ]);

  const order = orderResponse.data;
  const products = productsResponse.data ?? [];

  return (
    <section className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Mesa: {table.data?.name}
          </h1>
          <p className="text-gray-500">{table.data?.status}</p>
        </div>

        <div className="bg-muted px-4 py-2 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold">
            S/. {Number(order?.total ?? 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 🧾 DETALLE DEL PEDIDO */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Detalle de la orden
            </CardTitle>
          </CardHeader>

          <CardContent>
            {order?.orderDetails && order.orderDetails.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {order.orderDetails.map((item) => (
                      <TableRow key={item.product.id}>
                        <TableCell className="font-medium">
                          {item.product.name}
                        </TableCell>

                        <TableCell>{item.quantity}</TableCell>

                        <TableCell>
                          S/. {Number(item.product.price).toFixed(2)}
                        </TableCell>

                        <TableCell className="font-semibold">
                          S/.{" "}
                          {(Number(item.product.price) * item.quantity).toFixed(
                            2,
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                No hay productos en la orden
              </p>
            )}
          </CardContent>
        </Card>

        {/* 🛒 LISTA DE PRODUCTOS */}
        <ProductsOrder
          products={products}
          mesaId={id}
          orderId={order?.id ?? ""}
        />
      </div>
      <CloseOrderButton orderId={order?.id ?? ""} tableId={id} />
    </section>
  );
}
