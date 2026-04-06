import z from "zod";

export const authSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido."),
  password: z.string().min(1, "La contraseña es requerida."),
});

export type Auth = z.infer<typeof authSchema>;
