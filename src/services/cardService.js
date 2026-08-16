import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, storage } from "../firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Create a new digital card
export async function createDigitalCard(
  userId,
  cardData
) {
  const cardsRef = collection(
    db,
    "digitalCards"
  );

  const newCard = {
    ownerId: userId,

    name: cardData.name || "",
    title: cardData.title || "",
    bio: cardData.bio || "",
    phone: cardData.phone || "",
    email: cardData.email || "",
    address: cardData.address || "",

    website: cardData.website || "",
    facebook: cardData.facebook || "",
    instagram: cardData.instagram || "",
    tiktok: cardData.tiktok || "",
    linkedin: cardData.linkedin || "",

    additionalLinks:
      cardData.additionalLinks || [],

    profileImageUrl:
      cardData.profileImageUrl || "",

    template:
      cardData.template || "classic",

    gallery: [],
    products: [],

    published: false,

    createdAt:
      serverTimestamp(),

    updatedAt:
      serverTimestamp(),
  };

  const docRef = await addDoc(
    cardsRef,
    newCard
  );

  return docRef.id;
}


// Get all cards belonging to a user
export async function getUserCards(
  userId
) {
  const cardsRef = collection(
    db,
    "digitalCards"
  );

  const q = query(
    cardsRef,
    where(
      "ownerId",
      "==",
      userId
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}


// Get one digital card
export async function getDigitalCard(
  cardId
) {
  const cardRef = doc(
    db,
    "digitalCards",
    cardId
  );

  const snapshot =
    await getDoc(cardRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Digital card not found."
    );
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}


// Upload a gallery image to Firebase Storage
export async function uploadGalleryImage(
  cardId,
  ownerId,
  file
) {
  if (!file) {
    throw new Error(
      "No image file selected."
    );
  }

  if (!ownerId) {
    throw new Error(
      "Owner ID is required."
    );
  }

  if (!cardId) {
    throw new Error(
      "Card ID is required."
    );
  }

  const fileExtension =
    file.name.split(".").pop();

  const fileName =
    `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  const storagePath =
    `digitalCards/${ownerId}/${cardId}/gallery/${fileName}`;

  const storageRef =
    ref(
      storage,
      storagePath
    );

  await uploadBytes(
    storageRef,
    file
  );

  const imageUrl =
    await getDownloadURL(
      storageRef
    );

  return {
    imageUrl,
    storagePath,
    fileName,
  };
}


// Update an existing digital card
// Only fields supplied in cardData are updated.
export async function updateDigitalCard(
  cardId,
  cardData
) {
  const cardRef = doc(
    db,
    "digitalCards",
    cardId
  );

  const updateData = {};

  if ("name" in cardData) {
    updateData.name =
      cardData.name || "";
  }

  if ("title" in cardData) {
    updateData.title =
      cardData.title || "";
  }

  if ("bio" in cardData) {
    updateData.bio =
      cardData.bio || "";
  }

  if ("phone" in cardData) {
    updateData.phone =
      cardData.phone || "";
  }

  if ("email" in cardData) {
    updateData.email =
      cardData.email || "";
  }

  if ("address" in cardData) {
    updateData.address =
      cardData.address || "";
  }

  if ("website" in cardData) {
    updateData.website =
      cardData.website || "";
  }

  if ("facebook" in cardData) {
    updateData.facebook =
      cardData.facebook || "";
  }

  if ("instagram" in cardData) {
    updateData.instagram =
      cardData.instagram || "";
  }

  if ("tiktok" in cardData) {
    updateData.tiktok =
      cardData.tiktok || "";
  }

  if ("linkedin" in cardData) {
    updateData.linkedin =
      cardData.linkedin || "";
  }

  if ("additionalLinks" in cardData) {
    updateData.additionalLinks =
      cardData.additionalLinks || [];
  }

  if ("profileImageUrl" in cardData) {
    updateData.profileImageUrl =
      cardData.profileImageUrl || "";
  }

  if ("template" in cardData) {
    updateData.template =
      cardData.template || "classic";
  }

  if ("gallery" in cardData) {
    updateData.gallery =
      cardData.gallery || [];
  }

  if ("products" in cardData) {
    updateData.products =
      cardData.products || [];
  }

  updateData.updatedAt =
    serverTimestamp();

  await updateDoc(
    cardRef,
    updateData
  );
}


// Publish or unpublish a digital card
export async function setCardPublished(
  cardId,
  published
) {
  const cardRef = doc(
    db,
    "digitalCards",
    cardId
  );

  await updateDoc(
    cardRef,
    {
      published,
      updatedAt:
        serverTimestamp(),
    }
  );
}


// Add a gallery item
export async function addGalleryItem(
  cardId,
  galleryItem
) {
  const cardRef = doc(
    db,
    "digitalCards",
    cardId
  );

  const snapshot =
    await getDoc(cardRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Digital card not found."
    );
  }

  const existingGallery =
    snapshot.data().gallery || [];

  await updateDoc(
    cardRef,
    {
      gallery: [
        ...existingGallery,
        galleryItem,
      ],

      updatedAt:
        serverTimestamp(),
    }
  );
}


// Remove a gallery item
export async function removeGalleryItem(
  cardId,
  itemId
) {
  const cardRef = doc(
    db,
    "digitalCards",
    cardId
  );

  const snapshot =
    await getDoc(cardRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Digital card not found."
    );
  }

  const existingGallery =
    snapshot.data().gallery || [];

  await updateDoc(
    cardRef,
    {
      gallery:
        existingGallery.filter(
          (item) =>
            item.id !== itemId
        ),

      updatedAt:
        serverTimestamp(),
    }
  );
}


// Add a product
export async function addProduct(
  cardId,
  product
) {
  const cardRef = doc(
    db,
    "digitalCards",
    cardId
  );

  const snapshot =
    await getDoc(cardRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Digital card not found."
    );
  }

  const existingProducts =
    snapshot.data().products || [];

  await updateDoc(
    cardRef,
    {
      products: [
        ...existingProducts,
        product,
      ],

      updatedAt:
        serverTimestamp(),
    }
  );
}


// Remove a product
export async function removeProduct(
  cardId,
  productId
) {
  const cardRef = doc(
    db,
    "digitalCards",
    cardId
  );

  const snapshot =
    await getDoc(cardRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Digital card not found."
    );
  }

  const existingProducts =
    snapshot.data().products || [];

  await updateDoc(
    cardRef,
    {
      products:
        existingProducts.filter(
          (product) =>
            product.id !== productId
        ),

      updatedAt:
        serverTimestamp(),
    }
  );
}