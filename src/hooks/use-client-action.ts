import type {
  ClientFirestoreSchema,
  SalesOrPaymentsFirestoreSchema,
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
    throw new Error("Usuario no autenticado");
  }

  const db = useFirestore();
  const clientCollectionRef = collection(db, "clients");
  const salesCollectionRef = collection(db, "sales");
  const paymentsCollectionRef = collection(db, "payments");

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
    salesOrPayments: string,
  ) => {
    const newData: Omit<SalesOrPaymentsFirestoreSchema, "id"> = {
      ...data,
      date: serverTimestamp(),
      clientId,
    };

    if (salesOrPayments === "sale") {
      return await addDoc(salesCollectionRef, newData);
    } else if (salesOrPayments === "payment") {
      return await addDoc(paymentsCollectionRef, newData);
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
