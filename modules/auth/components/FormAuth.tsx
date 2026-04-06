"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth, authSchema } from "../schemas/auth.schema";
import { signIn } from "next-auth/react";
export function FormAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "@Gatito123",
      password: "123456789",
    },
  });

  async function onSubmit(data: Auth) {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (!res || res.error) {
      alert("Credenciales no validas.");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Username
        <input {...register("username")} />
      </label>
      {errors.username && <p>{errors.username.message}</p>}

      <label>
        Password
        <input type="password" {...register("password")} />
      </label>
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Sign In</button>
    </form>
  );
}
