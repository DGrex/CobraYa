import * as z from "zod";
import { validarCedulaEcuatoriana } from "./validate-id";

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

export const registerClientZodSchema = z
  .object({
    ci: z
      .string()
      .trim()
      .min(10, "Mínimo 10 numero")
      .max(10, "Máximo 10 numero"),
    name: z
      .string()
      .min(3, "Mínimo 3 caracteres")
      .max(25, "Máximo 25 caracteres"),
    lastName: z
      .string()
      .trim()
      .min(3, "Mínimo 3 caracteres")
      .max(25, "Máximo 25 caracteres"),
    email: z
      .string()
      .trim()
      .pipe(z.email("Formato del correo invalido"))
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .trim()
      .min(10, "Mínimo 10 numero")
      .max(10, "Máximo 10 numero")
      .regex(/^\d+$/, "Solo números")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => validarCedulaEcuatoriana(data.ci), {
    message: "Cédula Invalida",
    path: ["ci"],
  });

export type RegisterClientZodSchemaType = z.infer<
  typeof registerClientZodSchema
>;

// zod schema Sales

export const salesClientZodSchema = z.object({
  debt: z
    .number("Debe ser un número")
    .min(1, "La deuda debe ser mayor a 0")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Solo se permiten hasta dos decimales",
    }),
});

export type SalesClientZodSchemaType = z.infer<typeof salesClientZodSchema>;

export const searchClientZodSchema = z
  .object({
    ci: z
      .string()
      .trim()
      .min(10, "Mínimo 10 numero")
      .max(10, "Máximo 10 numero"),
  })
  .refine((data) => validarCedulaEcuatoriana(data.ci), {
    message: "Cédula Invalida",
    path: ["ci"],
  });

export type SearchClientZodSchemaType = z.infer<typeof searchClientZodSchema>;
