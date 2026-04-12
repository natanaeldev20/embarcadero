"use client";

import { Controller, useForm } from "react-hook-form";
import { CreateProduct, createProductSchema } from "../schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductAction } from "../server-actions/product.action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/modules/category/schemas/category.schema";

interface Props {
  categories: Category[];
}

export const CreateProductForm = ({ categories }: Props) => {
  const form = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",

      categoryId: "",
    },
  });

  const onSubmit = async (data: CreateProduct) => {
    const res = await createProductAction(data);

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
        <CardTitle>Crear nuevo producto</CardTitle>
        <CardDescription>
          Complete los campos para crear un producto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-create-product" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Nombre del producto:</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ingrese nombre del producto"
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
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Categoria:</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Precio:</FieldLabel>
                  <Input
                    {...field}
                    value={(field.value as number) ?? ""}
                    type="number"
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber,
                      )
                    }
                    placeholder="Ingrese precio del producto"
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
          <Button
            className="w-full font-bold"
            type="submit"
            form="form-create-product"
          >
            {form.formState.isSubmitting
              ? "Creando producto..."
              : "Crear nuevo producto"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
