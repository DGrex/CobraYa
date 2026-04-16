import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  searchClientZodSchema,
  type SearchClientZodSchemaType,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import type { ClientFirestoreSchema } from "@/schemas/client.schema";

type ClientSearchProps = {
  onClientFound: (client: ClientFirestoreSchema) => void;
  findClientByCi: (ci: string) => Promise<ClientFirestoreSchema | null>;
};

const ClientSearch = ({ onClientFound, findClientByCi }: ClientSearchProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SearchClientZodSchemaType>({
    resolver: zodResolver(searchClientZodSchema),
    defaultValues: {
      ci: "",
    },
  });

  const onSubmit = async (data: SearchClientZodSchemaType) => {
    startTransition(async () => {
      try {
        const client = await findClientByCi(data.ci);
        if (client) {
          onClientFound(client);
        } else {
          toast.error("No existe cliente con esa cédula");
        }
      } catch (error) {
        toast.error("Error al buscar cliente", {
          description: error instanceof Error ? error.message : String(error),
        });
      }
    });

    console.log(data);
  };
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="ci"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Cédula</FieldLabel>
              <Input {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={isPending} className="w-full mt-5">
        {isPending ? "Buscando..." : "Buscar"}
      </Button>
    </form>
  );
};

export default ClientSearch;
