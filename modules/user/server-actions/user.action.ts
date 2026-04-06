"use server";

import prisma from "@/lib/db";
import {
  CreateUser,
  createUserSchema,
  UpdateUser,
  updateUserSchema,
} from "../schemas/user.schema";

export const getUser = async (idUser: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: idUser,
      },
    });

    return {
      ok: true,
      data: user,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return {
      ok: false,
      message: "No se pudo obtener el usuario.",
    };
  }
};

export const createUserAction = async (rawData: CreateUser) => {
  const { data, success } = createUserSchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al crear el usuario.",
    };
  }

  try {
    const newUser = await prisma.user.create({
      data,
    });

    return {
      ok: true,
      data: newUser,
      message: "Usuario creado con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const updateUserAction = async (rawData: UpdateUser, idUser: string) => {
  const { data, success } = updateUserSchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al actualizar el usuario.",
    };
  }

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: idUser,
      },
      data,
    });

    return {
      ok: true,
      data: updateUser,
      message: "Usuario creado con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const deleteUserAction = async (idUser: string) => {
  try {
    const removeUser = await prisma.user.delete({
      where: {
        id: idUser,
      },
    });

    return {
      ok: true,
      data: removeUser,
      message: "Usuario eliminado con exito.",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};
