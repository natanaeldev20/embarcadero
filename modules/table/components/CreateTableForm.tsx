"use client";

import { Controller, useForm } from "react-hook-form";
import { CreateTable, createTableSchema } from "../schemas/table.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createTableAction } from "../server-actions/table.action";
import { toast } from "react-toastify";

export const CreateTableForm = () => {
  const form = useForm<CreateTable>({
    resolver: zodResolver(createTableSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateTable) => {
    const res = await createTableAction(data);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    form.reset();
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Crear nueva mesa</CardTitle>
        <CardDescription>
          Completa los campos para crear una nueva mesa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-create-table" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Nombre de la mesa:</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ingrese nombre de la mesa"
                    autoComplete="off"
                    autoFocus
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
            form="form-create-table"
            className="w-full font-bold"
            type="submit"
          >
            {form.formState.isSubmitting
              ? "Creando mesa..."
              : "Crear nueva mesa"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
