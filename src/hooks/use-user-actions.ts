import type { UserFirestoreSchema } from "@/schemas/user.schema";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

export const useUserActions = () => {
  const db = useFirestore();

  const createOrUpdateUser = async (user: User) => {
    if (!user) throw new Error("Usuario no encontrado");
    const userDocRef = doc(db, "users", user.uid);
    const userData: UserFirestoreSchema = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
    };

    return await setDoc(userDocRef, userData, {
      merge: true,
    });
  };

  return {
    createOrUpdateUser,
  };
};
