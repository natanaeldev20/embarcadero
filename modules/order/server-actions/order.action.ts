"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getOrCreateOrderAction = async (tableId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { ok: false, message: "No autorizado." };
    }

    const existingOrder = await prisma.order.findFirst({
      where: {
        tableId: tableId,
        status: "ABIERTO",
      },
      include: {
        orderDetails: {
          include: {
            product: {
              select: { id: true, category: true, name: true, price: true },
            },
          },
        },
      },
    });

    if (existingOrder) {
      return {
        ok: true,
        data: existingOrder,
      };
    }

    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          tableId,
          userId: session.user?.id,
          status: "ABIERTO",
          total: 0,
        },
        include: {
          orderDetails: {
            include: {
              product: {
                select: { id: true, category: true, name: true, price: true },
              },
            },
          },
        },
      });

      await tx.table.update({
        where: { id: tableId },
        data: { status: "OCUPADO" },
      });

      return order;
    });

    return {
      ok: true,
      data: newOrder,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return {
      ok: false,
      message: "Error del servidor.",
    };
  }
};

export const addProductToOrder = async (orderId: string, productId: string) => {
  try {
    // 1. Obtener producto
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("No existe el producto.");
    }

    // 2. Buscar si ya existe en la orden
    const existingDetail = await prisma.orderDetail.findFirst({
      where: {
        orderId,
        productId,
      },
    });

    if (existingDetail) {
      // 3. Si existe → aumentar cantidad
      await prisma.orderDetail.update({
        where: { id: existingDetail.id },
        data: {
          quantity: existingDetail.quantity + 1,
        },
      });
    } else {
      // 4. Si no existe → crear
      await prisma.orderDetail.create({
        data: {
          orderId,
          productId,
          quantity: 1,
          price: product.price, // Decimal
        },
      });
    }

    // 5. Recalcular total
    const orderDetails = await prisma.orderDetail.findMany({
      where: { orderId },
    });

    const total = orderDetails.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0);

    // 6. Actualizar orden
    await prisma.order.update({
      where: { id: orderId },
      data: {
        total: new Prisma.Decimal(total),
      },
    });

    return {
      ok: true,
      message: "Producto agregado",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al agregar producto",
    };
  }
};

export const closeOrder = async (orderId: string, tableId: string) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAGADO",
      },
    });

    await prisma.table.update({
      where: { id: tableId },
      data: {
        status: "LIBRE",
      },
    });

    return {
      ok: true,
      message: "Orden finalizada con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo.",
    };
  }
};
