import ClientSearch from "@/components/clientSearch";
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
  salesClientZodSchema,
  type SalesClientZodSchemaType,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const PaymentsPage = () => {
  const [isPending, startTransition] = useTransition();
  const { findClientByCi, createSales, updateClient } = useClientAction();
  const [clientData, setClientData] = useState({
    ci: "",
    name: "",
    lastName: "",
    debt: 0,
    clientId: "",
  });

  const form = useForm<SalesClientZodSchemaType>({
    resolver: zodResolver(salesClientZodSchema),
    defaultValues: {
      debt: undefined,
    },
  });

  const onSubmit = async (data: SalesClientZodSchemaType) => {
    startTransition(async () => {
      try {
        if (!clientData.clientId) {
          throw new Error("No has buscado un cliente");
        }
        const updatedDebt = clientData.debt - data.debt;
        await createSales(data, clientData.clientId, "payment");
        await updateClient(clientData.clientId, { debt: updatedDebt });
        setClientData((prev) => ({ ...prev, debt: updatedDebt }));
        form.reset();
      } catch (error) {
        console.log(error);
        const MessageError =
          error instanceof Error ? error.message : String(error);
        toast.error("Fallo al registrar la venta", {
          description: MessageError,
        });
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
          <ClientSearch
            findClientByCi={findClientByCi}
            onClientFound={(client) =>
              setClientData({
                ci: client.ci,
                name: client.name,
                lastName: client.lastName,
                debt: client.debt,
                clientId: client.id,
              })
            }
          />
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-rhf-demo-title">Nombre</FieldLabel>
                <Input value={clientData.name} disabled />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-rhf-demo-title">Apellido</FieldLabel>
                <Input value={clientData.lastName} disabled />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Deuda Actual
                </FieldLabel>
                <Input value={clientData.debt} disabled />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="debt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Valor de Pago
                    </FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      value={Number.isNaN(field.value) ? "" : field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder="0"
                    />
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

export default PaymentsPage;
