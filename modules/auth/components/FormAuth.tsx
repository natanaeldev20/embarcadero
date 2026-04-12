"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth, authSchema } from "../schemas/auth.schema";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const FormAuth = () => {
  const router = useRouter();
  const form = useForm<Auth>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: Auth) {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (!res.ok || res.error) {
      toast.error("Credenciales no validas.");
      return;
    }
    toast.success("Inicio de session con exito.");
    router.push("/panel");
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Iniciar Sesion</CardTitle>
        <CardDescription>Bienvenido a tu sistema favorito.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-auth" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nombre de usuario:</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ingrese nombre de usuario"
                    autoComplete="off"
                    autoFocus
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Contraseña:</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Ingrese contraseña"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button className="w-full" form="form-auth" type="submit">
            {form.formState.isSubmitting ? "Ingresando..." : "Iniciar Sesion"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
