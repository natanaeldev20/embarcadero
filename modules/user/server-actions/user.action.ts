"use server";
import prisma from "@/lib/db";
import {
  CreateUser,
  createUserSchema,
  UpdateUser,
  updateUserSchema,
} from "../schemas/user.schema";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { refresh, revalidatePath } from "next/cache";

export const getsUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        imgUrl: true,
        username: true,
      },
    });

    return {
      ok: true,
      data: users,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return {
      ok: false,
      message: "No se pudo obtener los usuarios.",
    };
  }
};

export const getUserProfile = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No se pudo obtener el id");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        imgUrl: true,
        username: true,
      },
    });

    return {
      ok: true,
      data: user ?? null,
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

export const getUser = async (idUser: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: idUser },
      select: {
        id: true,
        name: true,
        lastName: true,
        imgUrl: true,
        username: true,
      },
    });

    return {
      ok: true,
      data: user ?? null,
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
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        username: data.username.toLowerCase().trim(), // opcional pero recomendado
        password: hashedPassword,
      },
    });

    return {
      ok: true,
      data: newUser,
      message: "Usuario creado con éxito.",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error en el servidor.",
    };
  }
};

export const updateUserAction = async (rawData: UpdateUser, userId: string) => {
  const { data, success } = updateUserSchema.safeParse(rawData);

  if (!success) {
    return {
      ok: false,
      message: "Error al actualizar el usuario.",
    };
  }

  try {
    const { password, ...rest } = data;

    const dataUpdate: UpdateUser = { ...rest };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataUpdate.password = hashedPassword;
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: dataUpdate,
      select: {
        id: true,
        name: true,
        lastName: true,
        imgUrl: true,
        username: true,
      },
    });

    refresh();

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

export const deleteUserAction = async (userId: string) => {
  try {
    const removeUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/panel/usuarios");

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
