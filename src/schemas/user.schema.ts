export interface UserFirestoreSchema {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
}