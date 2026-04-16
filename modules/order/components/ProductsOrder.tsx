"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Product } from "@/modules/product/schemas/product.schema";
import { addProductToOrder } from "../server-actions/order.action";
import { toast } from "react-toastify";

interface Props {
  products: Product[];
  mesaId: string;
  orderId: string;
}

export const ProductsOrder = ({ products, orderId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const router = useRouter();

  // 🔍 Filtrado
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Agregar productos
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* 🔍 Input buscador */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        <ScrollArea className="h-[420px] pr-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <Button
                  key={p.id}
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      const res = await addProductToOrder(orderId, p.id);

                      if (!res.ok) {
                        toast.error(res.message);
                        return;
                      }

                      toast.success(res.message);
                      router.refresh();
                    })
                  }
                  variant="outline"
                  className="h-auto flex flex-col items-start p-3 rounded-xl hover:bg-muted transition"
                >
                  <span className="font-semibold text-sm text-left">
                    {p.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    S/. {Number(p.price).toFixed(2)}
                  </span>
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground col-span-2 text-center">
                No se encontraron productos
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
