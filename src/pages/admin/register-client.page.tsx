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
import { useClientAction } from "@/hooks/use-client-action";
import {
  registerClientZodSchema,
  type RegisterClientZodSchemaType,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterClientPage = () => {
  const { createClient } = useClientAction();
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterClientZodSchemaType>({
    resolver: zodResolver(registerClientZodSchema),
    defaultValues: {
      ci: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterClientZodSchemaType) => {
    startTransition(async () => {
      try {
        await createClient(data);
        form.reset();
      } catch (error) {
        console.log(error);
        const MessageError =
          error instanceof Error ? error.message : String(error);
        toast.error("Fallo al registrar al cliente", {
          description: MessageError,
        });

        if (MessageError === "Ya existe un cliente con esa Cedula") {
          form.setError("ci", {
            type: "manual",
            message: "Cedula ya registrada",
          });
        }
      }
    });

    console.log(data);
  };

  return (
    <div>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>CobraYa</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="ci"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Cédula
                    </FieldLabel>
                    <Input {...field} placeholder="0123456789" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Nombre
                    </FieldLabel>
                    <Input {...field} placeholder="Nombre del cliente" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Apellido
                    </FieldLabel>
                    <Input {...field} placeholder="Apellido del cliente" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Correo
                    </FieldLabel>
                    <Input {...field} placeholder="ejemplo@cobraya.com" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Teléfono
                    </FieldLabel>
                    <Input {...field} placeholder="0999999999" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" disabled={isPending} className="w-full mt-5">
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterClientPage;
