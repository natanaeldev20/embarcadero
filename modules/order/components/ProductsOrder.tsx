"use client";

import { useTransition } from "react";
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
  const router = useRouter();

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Agregar productos
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[420px] pr-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((p) => (
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
