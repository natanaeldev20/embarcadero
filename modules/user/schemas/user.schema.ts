import z from "zod";

// model User {
//   id        String   @id @default(cuid())
//   name      String
//   lastName  String
//   imgUrl    String   @default("https://thumbs.dreamstime.com/b/mozo-joven-aislado-de-fondo-blanco-el-179066502.jpg")
//   username  String   @unique
//   password  String
//   tables    Table[]
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "El nombre de usuario es requerido."),
  lastName: z.string().min(1, "El apellido de usuario es requerido."),
  imgUrl: z.string().min(1, "La foto de perfil es requerida."),
  username: z.string().min(1, "El nombre de usuario es requerido."),
  password: z.string().min(1, "La contraseña es requerida."),
});

export const userrSchema = userSchema.omit({ password: true });
export const createUserSchema = userSchema.omit({ id: true });
export const updateUserSchema = userSchema.omit({ id: true }).partial();

export type User = z.infer<typeof userrSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
