"use client";

import { Controller, useForm } from "react-hook-form";
import { type CreateUser, createUserSchema } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserAction } from "../server-actions/user.action";
import { toast } from "react-toastify";
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

export const CreateUserForm = () => {
  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      lastName: "",
      imgUrl: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateUser) => {
    const res = await createUserAction(data);

    if (!res.ok) {
      toast.error(res.message);
    }

    toast.success(res.message);
    form.reset();
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Crear nuevo usuario</CardTitle>
        <CardDescription>
          Llena los campos de este formulario para crear un nuevo usuario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-create-user" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel id="form-user-name">Nombre:</FieldLabel>
                    <Input
                      {...field}
                      id="form-user-name"
                      placeholder="Ingrese nombre"
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
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel id="form-user-lastname">Apellido:</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Ingrese apellido"
                      autoComplete="off"
                      id="form-user-lastname"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="imgUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel id="form-user-img">Foto de perfil:</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ingrese foto de perfil"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel id="form-user-img">Nombre de usuario:</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ingrese nombre de usuario"
                    autoComplete="off"
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
                <Field>
                  <FieldLabel id="form-user-img">Contraseña:</FieldLabel>
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
        <Field orientation={"horizontal"}>
          <Button
            className="w-full font-semibold"
            form="form-create-user"
            type="submit"
          >
            {form.formState.isSubmitting
              ? "Creando nuevo usuario..."
              : "Crear nuevo usuario"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
