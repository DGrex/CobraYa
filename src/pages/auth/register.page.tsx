import CardFooterAuth from "@/components/card-footer-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  registerZodSchema,
  type RegisterZodSchemaType,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
const RegisterPage = () => {
  const { loading, register } = useAuthActions();

  const form = useForm<RegisterZodSchemaType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterZodSchemaType) => {
    const result = await register(data);
    if (!result.success) {
      if (result.error?.code === "auth/email-already-in-use") {
        toast.error("Error al Registrarse", {
          description: "Correo ya registrado",
        });
      } else {
        toast.error("Error al Registrarse", {
          description: "Intenta nuevamente más tarde"
        });
      }
    }
    console.log(result)
  };
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>CobraYa</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Correo</FieldLabel>
                  <Input {...field} placeholder="ejemplo@gmail.com" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="displayName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Nombre de Usuario
                  </FieldLabel>
                  <Input {...field} placeholder="Nombre de Usuario" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Contraceña
                  </FieldLabel>
                  <Input {...field} placeholder="******" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Confirme su contraseña
                  </FieldLabel>
                  <Input {...field} placeholder="******" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="w-full mt-5">
            {loading ? (
              "Cargando"
            ) : (
              <>
                Registrarse <MoveRight className="ml-3" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooterAuth type="register" loading={loading} />
    </Card>
  );
};

export default RegisterPage;
