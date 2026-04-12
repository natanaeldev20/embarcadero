"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { closeOrder } from "../server-actions/order.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  orderId: string;
  tableId: string;
}

export const CloseOrderButton = ({ orderId, tableId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await closeOrder(orderId, tableId);

          if (!res.ok) {
            toast.error(res.message);
            return;
          }

          toast.success(res.message);
          router.push("/panel/mesas");
        })
      }
    >
      Finalizar orden
    </Button>
  );
};
