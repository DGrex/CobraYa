import type { ClientFirestoreSchema } from "@/schemas/client.schema";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { useFirestore, useUser } from "reactfire";

export const useClientAction = () => {
  const { data: user } = useUser();
  if (!user) {
    throw new Error("Usurio no autenticado");
  }

  const db = useFirestore();
  const clientCollectionRef = collection(db, "clients"); 

  const createClient = async (data: {
    ci: string;
    name: string;
    lastName: string;
    email?: string;
    phone?: string;
    debt?: number;
  }) => {

    const ciQuery = query(clientCollectionRef, where("ci", "==", data.ci))
    const ciSnapshot = await getDocs(ciQuery)

    if(!ciSnapshot.empty){
        throw new Error("Ya existe un cliente con esa Cedula")
    }

    const newClient: Omit<ClientFirestoreSchema, "id"> = {
      ...data,
      debt: 0,
      userID: user!.uid,
    };
    return await addDoc(clientCollectionRef, newClient);
  };

  return {
    createClient,
  };
};
