import * as z from "zod";

export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Formato del correo invalido")),
  password: z.string().min(6, "Mínimo 6 Caracteres"),
});

export type LoginZodSchemaType = z.infer<typeof loginZodSchema>;

export const registerZodSchema = z
  .object({
    email: z.string().trim().pipe(z.email("Formato del correo invalido")),
    displayName: z
      .string()
      .min(3, "Mínimo 3 caracteres")
      .max(20, "Máximo 20 caracteres"),
    password: z.string().min(6, "Mínimo 6 Caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 Caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "La contraseña no coincide",
    path: ["confirmPassword"],
  });

  export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>;