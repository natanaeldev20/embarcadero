"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Product } from "@/modules/product/schemas/product.schema";
import { addProductToOrder } from "../server-actions/order.action";
import { toast } from "react-toastify";
import { Search, Plus } from "lucide-react"; // Iconos para un look más pro

interface Props {
  products: Product[];
  mesaId: string;
  orderId: string;
}

export const ProductsOrder = ({ products, orderId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm rounded-3xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold tracking-tight text-primary">
          Catálogo de Productos
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* 🔍 Buscador Modernizado */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="¿Qué busca el cliente?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border-none ring-1 ring-border rounded-2xl text-sm transition-all focus:ring-2 focus:ring-primary outline-none shadow-sm"
          />
        </div>

        <ScrollArea className="h-[450px] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="group relative h-auto flex flex-row items-center justify-between p-4 rounded-2xl border-muted bg-background hover:border-primary/50 hover:bg-primary/[0.02] transition-all duration-200 text-left overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pr-2 max-w-[80%]">
                    <span className="font-bold text-sm leading-tight text-foreground break-words whitespace-normal">
                      {p.name}
                    </span>
                    <span className="text-xs font-medium text-primary">
                      S/. {Number(p.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-primary/10 text-primary p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Plus className="h-4 w-4" />
                  </div>
                </Button>
              ))
            ) : (
              <div className="col-span-full py-10 flex flex-col items-center justify-center text-muted-foreground">
                <p className="text-sm">No hay productos que coincidan</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
