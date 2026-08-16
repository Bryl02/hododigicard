import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createUserProfile(user) {
  const userRef = doc(db, "users", user.uid);

  const existingProfile = await getDoc(userRef);

  if (!existingProfile.exists()) {
    await setDoc(userRef, {
      email: user.email,
      createdAt: new Date(),
      plan: "free",
    });
  }
}

export async function getUserProfile(uid) {
  const userRef = doc(db, "users", uid);
  const profile = await getDoc(userRef);

  if (profile.exists()) {
    return profile.data();
  }

  return null;
}