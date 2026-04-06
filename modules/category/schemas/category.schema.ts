import z from "zod";

// model Category {
//   id        String    @id @default(cuid())
//   name      String
//   products  Product[]
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
// }

export const categorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "El nombre es requerido."),
});

export const createCategorySchema = categorySchema.omit({ id: true });
export const updateCategorySchema = categorySchema.omit({ id: true }).partial();

export type Category = z.infer<typeof categorySchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
