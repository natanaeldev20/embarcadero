import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/modules/product/server-actions/product.action";
import Link from "next/link";
import { Product } from "@/modules/product/schemas/product.schema";

export default async function ProductsPage() {
  const productsResponse = await getProducts();
  const products: Product[] = productsResponse.data ?? [];

  return (
    <section className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Productos</h1>

        <Link href={`/panel/productos/crear-producto`}>
          <Button className="w-full sm:w-auto">+ Nuevo producto</Button>
        </Link>
      </div>

      {/* ESTADO VACÍO */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-2xl bg-muted/30">
          <p className="text-muted-foreground text-sm">
            No hay productos registrados
          </p>

          <Link href={`/panel/productos/crear-producto`}>
            <Button className="mt-4">Crear primer producto</Button>
          </Link>
        </div>
      ) : (
        <div
          className="grid gap-4
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6"
        >
          {products.map((p) => (
            <Card
              key={p.id}
              className="rounded-2xl shadow-sm hover:shadow-md transition group cursor-pointer"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-sm md:text-base font-semibold uppercase tracking-wide group-hover:text-primary transition line-clamp-2">
                  {p.name}
                </CardTitle>

                {/* CATEGORÍA */}
                <Badge variant="secondary" className="mx-auto mt-2 text-xs">
                  {p.categoryName}
                </Badge>
              </CardHeader>

              <CardContent className="text-center">
                {/* PRECIO */}
                <p className="text-lg font-bold text-primary">
                  S/. {Number(p.price).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
