"use server";

import prisma from "@/lib/db";
import {
  type CreateProduct,
  createProductSchema,
  type UpdateProduct,
  updateProductSchema,
} from "../schemas/product.schema";

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const result = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      categoryName: p.category?.name ?? "",
    }));

    return {
      ok: true,
      data: result,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return {
      ok: false,
      message: "No se pudo obtener los productos.",
    };
  }
};

export const createProductAction = async (rawData: CreateProduct) => {
  const { data, success } = createProductSchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al crear el producto.",
    };
  }

  try {
    const newProduct = await prisma.product.create({
      data,
    });

    const parsedProduct = {
      ...newProduct,
      price: Number(newProduct.price),
      createdAt: newProduct.createdAt.toISOString(),
      updatedAt: newProduct.updatedAt.toISOString(),
    };

    return {
      ok: true,
      data: parsedProduct,
      message: "Producto creado con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const updateProductAction = async (
  rawData: UpdateProduct,
  idProduct: string,
) => {
  const { data, success } = updateProductSchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al actualizar el producto.",
    };
  }

  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: idProduct,
      },
      data,
    });

    return {
      ok: true,
      data: updateProduct,
      message: "Producto creado con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const deleteProductAction = async (idProduct: string) => {
  try {
    const removeProduct = await prisma.product.delete({
      where: {
        id: idProduct,
      },
    });

    return {
      ok: true,
      data: removeProduct,
      message: "Producto eliminado con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};
