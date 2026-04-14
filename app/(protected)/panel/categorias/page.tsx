import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Category } from "@/modules/category/schemas/category.schema";
import { getCategories } from "@/modules/category/server-actions/category.action";
import Link from "next/link";

export default async function CategoriesPage() {
  const categoriesResponse = await getCategories();
  const categories: Category[] = categoriesResponse.data ?? [];

  return (
    <section className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Categorías</h1>

        <Link href={`/panel/categorias/crear-categoria`}>
          <Button className="w-full sm:w-auto">+ Nueva categoría</Button>
        </Link>
      </div>

      {/* LISTADO */}
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-2xl bg-muted/30">
          <p className="text-muted-foreground text-sm">
            No hay categorías registradas
          </p>

          <Link href={`/panel/categorias/crear-categoria`}>
            <Button className="mt-4">Crear primera categoría</Button>
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
          {categories.map((c) => (
            <Card
              key={c.id}
              className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer group"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-base md:text-lg font-semibold uppercase tracking-wide group-hover:text-primary transition">
                  {c.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <p className="text-xs text-muted-foreground">Categoría</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
