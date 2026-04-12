"use client";

import { Controller, useForm } from "react-hook-form";
import {
  CreateCategory,
  createCategorySchema,
} from "../schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryAction } from "../server-actions/category.action";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateCategoryForm = () => {
  const form = useForm<CreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateCategory) => {
    const res = await createCategoryAction(data);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    form.reset();
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Crear categoria</CardTitle>
        <CardDescription>
          Complete los campos para crear una categoria.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-create-category" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Nombre de la categoria:</FieldLabel>
                <Input
                  {...field}
                  placeholder="Ingrese nombre de la categoria"
                  autoComplete="off"
                  autoFocus
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            className="w-full font-bold"
            type="submit"
            form="form-create-category"
          >
            {form.formState.isSubmitting
              ? "Creando categoria..."
              : "Crear nueva categoria"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
