"use server";

import prisma from "@/lib/db";
import {
  type CreateTable,
  createTableSchema,
  type UpdateTable,
  updateTableSchema,
} from "../schemas/table.schema";
import { Prisma } from "@prisma/client";

export type TableWithOrders = Prisma.TableGetPayload<{
  include: {
    orders: {
      include: {
        user: true;
      };
    };
  };
}>;

export const getTables = async () => {
  try {
    const tables = await prisma.table.findMany({
      include: {
        orders: {
          where: {
            status: {
              not: "PAGADO",
            },
          },
          include: {
            user: true,
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      ok: true,
      data: tables,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return {
      ok: false,
      message: "No se pudo obtener las mesas.",
    };
  }
};

export const getTable = async (tableId: string) => {
  try {
    const table = await prisma.table.findUnique({
      where: {
        id: tableId,
      },
      select: {
        name: true,
        status: true,
      },
    });

    return {
      ok: true,
      data: table,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return {
      ok: false,
    };
  }
};

export const createTableAction = async (rawData: CreateTable) => {
  const { data, success } = createTableSchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al crear la mesa.",
    };
  }

  try {
    const newTable = await prisma.table.create({
      data: {
        status: "LIBRE",
        name: data.name,
      },
    });

    return {
      ok: true,
      data: newTable,
      message: "Mesa creada con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const updateTableAction = async (
  rawData: UpdateTable,
  idTable: string,
) => {
  const { data, success } = updateTableSchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al actualizar la mesa.",
    };
  }

  try {
    const updateTable = await prisma.table.update({
      where: {
        id: idTable,
      },
      data,
    });

    return {
      ok: true,
      data: updateTable,
      message: "Tabla creada con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const deleteTableAction = async (idTable: string) => {
  try {
    const removeTable = await prisma.table.delete({
      where: {
        id: idTable,
      },
    });

    return {
      ok: true,
      data: removeTable,
      message: "Tabla eliminada con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};
