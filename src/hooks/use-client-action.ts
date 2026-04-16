import type {
  ClientFirestoreSchema,
  SalesOrPymentsFirestoreSchema,
} from "@/schemas/client.schema";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { useFirestore, useUser } from "reactfire";

export const useClientAction = () => {
  const { data: user } = useUser();
  if (!user) {
    throw new Error("Usurio no autenticado");
  }

  const db = useFirestore();
  const clientCollectionRef = collection(db, "clients");
  const salesCollectionRef = collection(db, "sales");
  const pymentsCollectionRef = collection(db, "pyments");

  const createClient = async (data: {
    ci: string;
    name: string;
    lastName: string;
    email?: string;
    phone?: string;
    debt?: number;
  }) => {
    const ciQuery = query(clientCollectionRef, where("ci", "==", data.ci));
    const ciSnapshot = await getDocs(ciQuery);

    if (!ciSnapshot.empty) {
      throw new Error("Ya existe un cliente con esa Cedula");
    }

    const newClient: Omit<ClientFirestoreSchema, "id"> = {
      ...data,
      debt: 0,
      userID: user!.uid,
    };
    return await addDoc(clientCollectionRef, newClient);
  };

  const updateClient = async (
    id: string,
    data: Partial<{
      ci: string;
      name: string;
      lastName: string;
      email?: string;
      phone?: string;
      debt?: number;
    }>,
  ) => {
    const clientRef = doc(clientCollectionRef, id);
    await updateDoc(clientRef, {
      ...data,
      updatedAt: new Date(),
    });
  };

  const findClientByCi = async (ci: string) => {
    const clientCollectionRef = collection(db, "clients");
    const ciQuery = query(
      clientCollectionRef,
      where("ci", "==", ci),
      where("userID", "==", user.uid),
    );
    const snapshot = await getDocs(ciQuery);

    if (snapshot.empty) return null;

    // Tomamos el primer resultado
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    } as ClientFirestoreSchema;
  };

  const createSales = async (
    data: {
      debt: number;
    },
    clientId: string,
    salesOrPyments: string,
  ) => {
    const newData: Omit<SalesOrPymentsFirestoreSchema, "id"> = {
      ...data,
      date: serverTimestamp(),
      clientId,
    };

    if (salesOrPyments === "sale") {
      return await addDoc(salesCollectionRef, newData);
    } else if (salesOrPyments === "pyment") {
      return await addDoc(pymentsCollectionRef, newData);
    } else {
      throw new Error("Tipo de operación inválido");
    }
  };

  return {
    createClient,
    updateClient,
    findClientByCi,
    createSales,
  };
};
