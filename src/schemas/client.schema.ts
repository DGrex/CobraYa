import type { Timestamp } from "firebase/firestore";

export interface ClientFirestoreSchema {
  id: string;
  ci: string;
  name: string;
  lastName: string;
  email?: string;
  phone?: string;
  debt?: number;
  userID: string;
}

export interface SalesOrPymentsFirestoreSchema {
    id: string;
    date: Timestamp;
    debt: number;
    clientId: string;
}
