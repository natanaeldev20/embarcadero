import z from "zod";

// model Product {
//   id           String        @id @default(cuid())
//   name         String
//   price        Decimal       @db.Decimal(10, 2)
//   orderDetails OrderDetail[]
//   category     Category      @relation(fields: [categoryId], references: [id])
//   categoryId   String
//   createdAt    DateTime      @default(now())
//   updatedAt    DateTime      @updatedAt
// }

export const productSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "El nombre es requerido."),
  price: z.number().min(1),
  categoryName: z.string(),
  categoryId: z.string().cuid(),
});

export const producttSchema = productSchema.omit({
  categoryId: true,
});

export const createProductSchema = productSchema.omit({
  id: true,
  categoryName: true,
});

export const updateProductSchema = productSchema
  .omit({
    id: true,
    categoryName: true,
  })
  .partial();

export type Product = z.infer<typeof producttSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
