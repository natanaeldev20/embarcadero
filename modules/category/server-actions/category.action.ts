"use server";

import prisma from "@/lib/db";
import {
  CreateCategory,
  createCategorySchema,
  UpdateCategory,
  updateCategorySchema,
} from "../schemas/category.schema";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      ok: true,
      data: categories,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return {
      ok: false,
      message: "No se pudo obtener las categorias.",
    };
  }
};

export const createCategoryAction = async (rawData: CreateCategory) => {
  const { data, success } = createCategorySchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al crear la categoria.",
    };
  }

  try {
    const newCategory = await prisma.category.create({
      data,
    });

    return {
      ok: true,
      data: newCategory,
      message: "Categoria creada con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const updateCategoryAction = async (
  rawData: UpdateCategory,
  idCategory: string,
) => {
  const { data, success } = updateCategorySchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al actualizar la categoria.",
    };
  }

  try {
    const updateCategory = await prisma.category.update({
      where: {
        id: idCategory,
      },
      data,
    });

    return {
      ok: true,
      data: updateCategory,
      message: "Categoria creada con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const deleteCategoryAction = async (idCategory: string) => {
  try {
    const removeCategory = await prisma.category.delete({
      where: {
        id: idCategory,
      },
    });

    return {
      ok: true,
      data: removeCategory,
      message: "Categoria eliminada con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};
