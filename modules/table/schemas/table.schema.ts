// model Table {
//   id        String      @id @default(cuid())
//   name      String
//   status    TableStatus @default(LIBRE)
//   orders    Order[]
//   user      User?       @relation(fields: [userId], references: [id])
//   userId    String?
//   createdAt DateTime    @default(now())
//   updatedAt DateTime    @updatedAt
// }

import z from "zod";

export const tableSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "El nombre de la mesa es requerido."),
  status: z.enum(["LIBRE", "OCUPADO", "RESERVADO"]).default("LIBRE"),
  user: z
    .object({
      name: z.string(),
      lastName: z.string(),
      imgUrl: z.string(),
    })
    .nullable(),
  userId: z.string().cuid().optional(),
});

export const tableeSchema = tableSchema.omit({ userId: true });
export const createTableSchema = tableSchema.omit({ id: true, user: true });
export const updateTableSchema = tableSchema
  .omit({ id: true, user: true })
  .partial();

export type Table = z.infer<typeof tableeSchema>;
export type CreateTable = z.infer<typeof createTableSchema>;
export type UpdateTable = z.infer<typeof updateTableSchema>;
