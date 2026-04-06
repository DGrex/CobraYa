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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zod.schemas";
import CardFooterAuth from "@/components/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const { loading, login } = useAuthActions();
  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginZodSchemaType) => {
    const response = await login(data);
    if (!response.success) {
      if (response.error?.code === "auth/invalid-login-credentials") {
        toast.error("Error al iniciar sesión", {
          description: "Credenciales incorrectas",
        });
      }else{
        toast.error("Error al iniciar sesión", {
          description: "Intenta nuevamente más tarde",
        });
      }
    }
    console.log(response);
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
          <Button type="submit" className="w-full mt-5">
            {loading ? (
              "Cargando"
            ) : (
              <>
                Iniciar sesión <MoveRight className="ml-3" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooterAuth type="login" loading={loading} />
    </Card>
  );
};
export default LoginPage;
