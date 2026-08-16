import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { auth, storage } from "../firebase";

import {
  getDigitalCard,
  updateDigitalCard,
  uploadGalleryImage,
  removeGalleryItem,
} from "../services/cardService";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";


// ============================================================
// LIVE CARD PREVIEW
// ============================================================

function LiveCardPreview({
  name,
  title,
  bio,
  phone,
  email,
  address,
  website,
  facebook,
  instagram,
  tiktok,
  linkedin,
  additionalLinks,
  gallery,
  products,
  template,
  onClose,
}) {
  const templateStyles = {
    classic: {
      pageBackground: "#eef2f7",
      cardBackground: "#ffffff",
      text: "#111827",
      secondary: "#6b7280",
      accent: "#2563eb",
      buttonText: "#ffffff",
    },

    minimal: {
      pageBackground: "#ffffff",
      cardBackground: "#ffffff",
      text: "#111827",
      secondary: "#6b7280",
      accent: "#111827",
      buttonText: "#ffffff",
    },

    creator: {
      pageBackground: "#f5f3ff",
      cardBackground: "#ffffff",
      text: "#1f2937",
      secondary: "#6b7280",
      accent: "#7c3aed",
      buttonText: "#ffffff",
    },

    business: {
      pageBackground: "#ecfdf5",
      cardBackground: "#ffffff",
      text: "#0f172a",
      secondary: "#64748b",
      accent: "#0f766e",
      buttonText: "#ffffff",
    },
  };

  const theme =
    templateStyles[template] ||
    templateStyles.classic;

  const validLinks = Array.isArray(additionalLinks)
    ? additionalLinks.filter(
        (link) =>
          link.label?.trim() &&
          link.url?.trim()
      )
    : [];

  const validGallery = Array.isArray(gallery)
    ? gallery
    : [];

  const validProducts = Array.isArray(products)
    ? products
    : [];

  const hasSocials =
    website ||
    facebook ||
    instagram ||
    tiktok ||
    linkedin;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0, 0, 0, 0.70)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* PHONE FRAME */}

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          height: "min(850px, 92vh)",
          background: theme.pageBackground,
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.40)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* PREVIEW BAR */}

        <div
          style={{
            height: "54px",
            flexShrink: 0,
            background: "#111827",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px",
            boxSizing: "border-box",
          }}
        >
          <strong>
            Live Preview
          </strong>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "#374151",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "7px 12px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        {/* PUBLIC CARD */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "18px",
            boxSizing: "border-box",
          }}
        >
          {/* PROFILE */}

          <div
            style={{
              background: theme.cardBackground,
              borderRadius: "20px",
              padding: "25px 20px",
              textAlign: "center",
              boxShadow:
                "0 4px 18px rgba(0,0,0,0.07)",
              marginBottom: "15px",
            }}
          >
            {/* AVATAR */}

            <div
              style={{
                width: "86px",
                height: "86px",
                margin: "0 auto 15px",
                borderRadius: "50%",
                background: theme.accent,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "700",
              }}
            >
              {name?.trim()
                ? name.trim().charAt(0).toUpperCase()
                : "H"}
            </div>

            {/* NAME */}

            <h1
              style={{
                margin: 0,
                fontSize: "27px",
                color: theme.text,
              }}
            >
              {name || "Your Name"}
            </h1>

            {/* TITLE */}

            {title ? (
              <p
                style={{
                  margin:
                    "7px 0 0",
                  color:
                    theme.secondary,
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {title}
              </p>
            ) : (
              <p
                style={{
                  margin:
                    "7px 0 0",
                  color:
                    "#9ca3af",
                  fontSize: "14px",
                }}
              >
                Your profession or title
              </p>
            )}

            {/* BIO */}

            {bio ? (
              <p
                style={{
                  margin:
                    "16px 0 0",
                  lineHeight: 1.6,
                  color:
                    theme.secondary,
                  fontSize: "14px",
                }}
              >
                {bio}
              </p>
            ) : (
              <p
                style={{
                  margin:
                    "16px 0 0",
                  lineHeight: 1.6,
                  color:
                    "#9ca3af",
                  fontSize: "14px",
                }}
              >
                Your short bio will appear here.
              </p>
            )}

            {/* SOCIAL LINKS */}

            {hasSocials && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "18px",
                }}
              >
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme.accent,
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Website
                  </a>
                )}

                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme.accent,
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Facebook
                  </a>
                )}

                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme.accent,
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Instagram
                  </a>
                )}

                {tiktok && (
                  <a
                    href={tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme.accent,
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    TikTok
                  </a>
                )}

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme.accent,
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          {/* CONTACT */}

          {(phone ||
            email ||
            address) && (
            <div
              style={{
                background:
                  theme.cardBackground,
                borderRadius: "18px",
                padding: "18px",
                marginBottom: "15px",
              }}
            >
              <h2
                style={{
                  margin:
                    "0 0 14px",
                  fontSize: "18px",
                  color: theme.text,
                }}
              >
                Contact
              </h2>

              {phone && (
                <p
                  style={{
                    margin:
                      "9px 0",
                    fontSize: "14px",
                  }}
                >
                  📞{" "}
                  <a
                    href={`tel:${phone}`}
                    style={{
                      color:
                        theme.accent,
                    }}
                  >
                    {phone}
                  </a>
                </p>
              )}

              {email && (
                <p
                  style={{
                    margin:
                      "9px 0",
                    fontSize: "14px",
                  }}
                >
                  ✉️{" "}
                  <a
                    href={`mailto:${email}`}
                    style={{
                      color:
                        theme.accent,
                    }}
                  >
                    {email}
                  </a>
                </p>
              )}

              {address && (
                <p
                  style={{
                    margin:
                      "9px 0",
                    fontSize: "14px",
                    color: theme.text,
                  }}
                >
                  📍 {address}
                </p>
              )}
            </div>
          )}

          {/* ADDITIONAL LINKS */}

          {validLinks.length > 0 && (
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  color: theme.text,
                  margin:
                    "0 0 12px",
                }}
              >
                Links
              </h2>

              {validLinks.map(
                (link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      background:
                        theme.cardBackground,
                      color: theme.text,
                      textDecoration:
                        "none",
                      padding:
                        "14px 16px",
                      borderRadius:
                        "12px",
                      marginBottom:
                        "10px",
                      boxShadow:
                        "0 2px 8px rgba(0,0,0,0.05)",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          )}

          {/* PRODUCTS */}

          {validProducts.length > 0 && (
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  color: theme.text,
                  margin:
                    "0 0 12px",
                }}
              >
                Products & Services
              </h2>

              {validProducts.map(
                (product) => (
                  <div
                    key={product.id}
                    style={{
                      background:
                        theme.cardBackground,
                      borderRadius:
                        "16px",
                      overflow:
                        "hidden",
                      marginBottom:
                        "14px",
                      boxShadow:
                        "0 3px 12px rgba(0,0,0,0.06)",
                    }}
                  >
                    {product.imageUrl && (
                      <img
                        src={
                          product.imageUrl
                        }
                        alt={
                          product.name ||
                          "Product"
                        }
                        style={{
                          width: "100%",
                          height: "190px",
                          objectFit:
                            "cover",
                          display:
                            "block",
                        }}
                      />
                    )}

                    <div
                      style={{
                        padding: "16px",
                      }}
                    >
                      <h3
                        style={{
                          margin:
                            "0 0 7px",
                          color:
                            theme.text,
                          fontSize:
                            "17px",
                        }}
                      >
                        {product.name ||
                          "Product"}
                      </h3>

                      {product.price && (
                        <div
                          style={{
                            color:
                              theme.accent,
                            fontWeight:
                              "700",
                            marginBottom:
                              "8px",
                          }}
                        >
                          {
                            product.price
                          }
                        </div>
                      )}

                      {product.description && (
                        <p
                          style={{
                            color:
                              theme.secondary,
                            fontSize:
                              "13px",
                            lineHeight:
                              1.5,
                            margin:
                              "0 0 12px",
                          }}
                        >
                          {
                            product.description
                          }
                        </p>
                      )}

                      {product.link && (
                        <a
                          href={
                            product.link
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display:
                              "inline-block",
                            background:
                              theme.accent,
                            color:
                              theme.buttonText,
                            textDecoration:
                              "none",
                            padding:
                              "10px 16px",
                            borderRadius:
                              "10px",
                            fontWeight:
                              "600",
                            fontSize:
                              "13px",
                          }}
                        >
                          View / Order
                        </a>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* GALLERY */}

          {validGallery.length > 0 && (
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  color: theme.text,
                  margin:
                    "0 0 12px",
                }}
              >
                Gallery
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, 1fr)",
                  gap: "10px",
                }}
              >
                {validGallery.map(
                  (item) => (
                    <div
                      key={item.id}
                      style={{
                        background:
                          theme.cardBackground,
                        borderRadius:
                          "12px",
                        overflow:
                          "hidden",
                      }}
                    >
                      {item.imageUrl && (
                        <img
                          src={
                            item.imageUrl
                          }
                          alt={
                            item.title ||
                            "Gallery image"
                          }
                          style={{
                            width: "100%",
                            height: "135px",
                            objectFit:
                              "cover",
                            display:
                              "block",
                          }}
                        />
                      )}

                      <div
                        style={{
                          padding:
                            "10px",
                        }}
                      >
                        {item.title && (
                          <strong
                            style={{
                              fontSize:
                                "13px",
                              color:
                                theme.text,
                            }}
                          >
                            {
                              item.title
                            }
                          </strong>
                        )}

                        {item.description && (
                          <p
                            style={{
                              margin:
                                "5px 0 0",
                              fontSize:
                                "11px",
                              lineHeight:
                                1.4,
                              color:
                                theme.secondary,
                            }}
                          >
                            {
                              item.description
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* EMPTY PREVIEW MESSAGE */}

          {!phone &&
            !email &&
            !address &&
            validLinks.length === 0 &&
            validProducts.length === 0 &&
            validGallery.length === 0 && (
              <div
                style={{
                  background:
                    theme.cardBackground,
                  borderRadius:
                    "16px",
                  padding:
                    "18px",
                  textAlign:
                    "center",
                  color:
                    theme.secondary,
                  fontSize:
                    "13px",
                  marginBottom:
                    "15px",
                }}
              >
                Add contact information,
                links, products, or gallery
                items to see them here.
              </div>
            )}

          {/* FOOTER */}

          <div
            style={{
              textAlign: "center",
              padding:
                "15px 0 25px",
              color: "#9ca3af",
              fontSize: "11px",
            }}
          >
            HodoDigiCard
            <br />
            Digital Identity in a Tap.
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// EDIT CARD
// ============================================================

function EditCard() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  // =========================
  // BASIC INFORMATION
  // =========================

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  // =========================
  // CONTACT INFORMATION
  // =========================

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // =========================
  // SOCIAL & WEB
  // =========================

  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // =========================
  // ADDITIONAL LINKS
  // =========================

  const [additionalLinks, setAdditionalLinks] =
    useState([]);

  // =========================
  // GALLERY
  // =========================

  const [gallery, setGallery] = useState([]);
  const [galleryTitle, setGalleryTitle] =
    useState("");
  const [galleryDescription, setGalleryDescription] =
    useState("");
  const [galleryFile, setGalleryFile] =
    useState(null);
  const [uploadingGallery, setUploadingGallery] =
    useState(false);

  // =========================
  // PRODUCTS / SERVICES
  // =========================

  const [products, setProducts] = useState([]);

  const [productName, setProductName] =
    useState("");
  const [productDescription, setProductDescription] =
    useState("");
  const [productPrice, setProductPrice] =
    useState("");
  const [productLink, setProductLink] =
    useState("");
  const [productFile, setProductFile] =
    useState(null);

  const [uploadingProduct, setUploadingProduct] =
    useState(false);

  // =========================
  // TEMPLATE
  // =========================

  const [template, setTemplate] =
    useState("classic");

  // =========================
  // PAGE STATE
  // =========================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =========================
  // LIVE PREVIEW STATE
  // =========================

  const [showPreview, setShowPreview] =
    useState(false);

  // =========================
  // LOAD CARD
  // =========================

  useEffect(() => {
    async function loadCard() {
      try {
        const card =
          await getDigitalCard(cardId);

        if (
          !auth.currentUser ||
          card.ownerId !==
            auth.currentUser.uid
        ) {
          setMessage(
            "You do not have access to this card."
          );

          setLoading(false);
          return;
        }

        // Basic information

        setName(card.name || "");
        setTitle(card.title || "");
        setBio(card.bio || "");

        // Contact

        setPhone(card.phone || "");
        setEmail(card.email || "");
        setAddress(card.address || "");

        // Social & Web

        setWebsite(card.website || "");
        setFacebook(card.facebook || "");
        setInstagram(card.instagram || "");
        setTiktok(card.tiktok || "");
        setLinkedin(card.linkedin || "");

        // Additional links

        setAdditionalLinks(
          Array.isArray(
            card.additionalLinks
          )
            ? card.additionalLinks
            : []
        );

        // Gallery

        setGallery(
          Array.isArray(card.gallery)
            ? card.gallery
            : []
        );

        // Products

        setProducts(
          Array.isArray(card.products)
            ? card.products
            : []
        );

        // Template

        setTemplate(
          card.template || "classic"
        );

        setLoading(false);
      } catch (error) {
        console.error(
          "Load card error:",
          error
        );

        setMessage(
          error.message ||
            "Failed to load digital card."
        );

        setLoading(false);
      }
    }

    loadCard();
  }, [cardId]);

  // =========================
  // ADDITIONAL LINKS
  // =========================

  function addLink() {
    setAdditionalLinks([
      ...additionalLinks,
      {
        label: "",
        url: "",
      },
    ]);
  }

  function updateLink(
    index,
    field,
    value
  ) {
    const updatedLinks = [
      ...additionalLinks,
    ];

    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };

    setAdditionalLinks(
      updatedLinks
    );
  }

  function removeLink(index) {
    setAdditionalLinks(
      additionalLinks.filter(
        (_, i) => i !== index
      )
    );
  }

  // =========================
  // GALLERY UPLOAD
  // =========================

  async function handleGalleryUpload() {
    if (!auth.currentUser) {
      setMessage(
        "You must be logged in."
      );
      return;
    }

    if (!galleryFile) {
      setMessage(
        "Please choose an image first."
      );
      return;
    }

    if (!galleryTitle.trim()) {
      setMessage(
        "Please enter a gallery title."
      );
      return;
    }

    setUploadingGallery(true);
    setMessage("");

    try {
      setMessage(
        "Uploading gallery image..."
      );

      const uploadResult =
        await uploadGalleryImage(
          cardId,
          auth.currentUser.uid,
          galleryFile
        );

      const newGalleryItem = {
        id: crypto.randomUUID(),
        title:
          galleryTitle.trim(),
        description:
          galleryDescription.trim(),
        imageUrl:
          uploadResult.imageUrl,
        storagePath:
          uploadResult.storagePath,
      };

      const updatedGallery = [
        ...gallery,
        newGalleryItem,
      ];

      await updateDigitalCard(
        cardId,
        {
          gallery:
            updatedGallery,
        }
      );

      setGallery(
        updatedGallery
      );

      setGalleryTitle("");
      setGalleryDescription("");
      setGalleryFile(null);

      const fileInput =
        document.getElementById(
          "gallery-file-input"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      setMessage(
        "Gallery image uploaded successfully!"
      );
    } catch (error) {
      console.error(
        "Gallery upload error:",
        error
      );

      setMessage(
        `Gallery upload failed: ${
          error.code ||
          error.message
        }`
      );
    } finally {
      setUploadingGallery(false);
    }
  }

  // =========================
  // REMOVE GALLERY ITEM
  // =========================

  async function handleRemoveGalleryItem(
    itemId
  ) {
    try {
      await removeGalleryItem(
        cardId,
        itemId
      );

      const updatedGallery =
        gallery.filter(
          (item) =>
            item.id !== itemId
        );

      setGallery(
        updatedGallery
      );

      setMessage(
        "Gallery item removed."
      );
    } catch (error) {
      console.error(
        "Remove gallery error:",
        error
      );

      setMessage(
        `Remove failed: ${
          error.message
        }`
      );
    }
  }

  // =========================
  // IMAGE COMPRESSION
  // =========================

  async function compressImage(
    file
  ) {
    const maxWidth = 1600;
    const maxHeight = 1600;
    const quality = 0.82;

    const image = new Image();

    const objectUrl =
      URL.createObjectURL(file);

    image.src = objectUrl;

    await new Promise(
      (resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      }
    );

    let width = image.width;
    let height = image.height;

    if (
      width > maxWidth ||
      height > maxHeight
    ) {
      const ratio = Math.min(
        maxWidth / width,
        maxHeight / height
      );

      width = Math.round(
        width * ratio
      );

      height = Math.round(
        height * ratio
      );
    }

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width = width;
    canvas.height = height;

    const context =
      canvas.getContext("2d");

    context.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    const blob =
      await new Promise(
        (resolve, reject) => {
          canvas.toBlob(
            (result) => {
              if (result) {
                resolve(result);
              } else {
                reject(
                  new Error(
                    "Image compression failed."
                  )
                );
              }
            },
            "image/jpeg",
            quality
          );
        }
      );

    URL.revokeObjectURL(
      objectUrl
    );

    return blob;
  }

  // =========================
  // PRODUCT UPLOAD
  // =========================

  async function handleProductUpload() {
    if (!auth.currentUser) {
      setMessage(
        "You must be logged in."
      );
      return;
    }

    if (!productFile) {
      setMessage(
        "Please choose a product image first."
      );
      return;
    }

    if (!productName.trim()) {
      setMessage(
        "Please enter a product or service name."
      );
      return;
    }

    setUploadingProduct(true);
    setMessage("");

    try {
      setMessage(
        "Compressing product image..."
      );

      const compressedImage =
        await compressImage(
          productFile
        );

      const productId =
        crypto.randomUUID();

      const storagePath =
        `digitalCards/${auth.currentUser.uid}/${cardId}/products/${productId}.jpg`;

      const storageRef =
        ref(
          storage,
          storagePath
        );

      setMessage(
        "Uploading product image..."
      );

      await uploadBytes(
        storageRef,
        compressedImage,
        {
          contentType:
            "image/jpeg",
        }
      );

      const downloadUrl =
        await getDownloadURL(
          storageRef
        );

      const newProduct = {
        id: productId,
        name:
          productName.trim(),
        description:
          productDescription.trim(),
        price:
          productPrice.trim(),
        link:
          productLink.trim(),
        imageUrl:
          downloadUrl,
        storagePath:
          storagePath,
      };

      const updatedProducts = [
        ...products,
        newProduct,
      ];

      setMessage(
        "Saving product information..."
      );

      await updateDigitalCard(
        cardId,
        {
          products:
            updatedProducts,
        }
      );

      setProducts(
        updatedProducts
      );

      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductLink("");
      setProductFile(null);

      const fileInput =
        document.getElementById(
          "product-file-input"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      setMessage(
        "Product/service added successfully!"
      );
    } catch (error) {
      console.error(
        "Product upload error:",
        error
      );

      setMessage(
        `Product upload failed: ${
          error.code ||
          error.message
        }`
      );
    } finally {
      setUploadingProduct(false);
    }
  }

  // =========================
  // REMOVE PRODUCT
  // =========================

  async function handleRemoveProduct(
    product
  ) {
    try {
      if (product.storagePath) {
        const productStorageRef =
          ref(
            storage,
            product.storagePath
          );

        try {
          await deleteObject(
            productStorageRef
          );
        } catch (
          storageError
        ) {
          console.warn(
            "Product storage delete warning:",
            storageError
          );
        }
      }

      const updatedProducts =
        products.filter(
          (item) =>
            item.id !==
            product.id
        );

      await updateDigitalCard(
        cardId,
        {
          products:
            updatedProducts,
        }
      );

      setProducts(
        updatedProducts
      );

      setMessage(
        "Product/service removed."
      );
    } catch (error) {
      console.error(
        "Remove product error:",
        error
      );

      setMessage(
        `Remove failed: ${
          error.message
        }`
      );
    }
  }

  // =========================
  // SAVE CARD
  // =========================

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    if (!auth.currentUser) {
      setMessage(
        "You must be logged in."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const cleanedLinks =
        additionalLinks.filter(
          (link) =>
            link.label?.trim() ||
            link.url?.trim()
        );

      const cleanedGallery =
        gallery.filter(
          (item) =>
            item.imageUrl?.trim() ||
            item.title?.trim() ||
            item.description?.trim()
        );

      const cleanedProducts =
        products.filter(
          (product) =>
            product.name?.trim() ||
            product.imageUrl?.trim()
        );

      await updateDigitalCard(
        cardId,
        {
          name,
          title,
          bio,

          phone,
          email,
          address,

          website,
          facebook,
          instagram,
          tiktok,
          linkedin,

          additionalLinks:
            cleanedLinks,

          gallery:
            cleanedGallery,

          products:
            cleanedProducts,

          template,
        }
      );

      setMessage(
        "Digital card updated successfully!"
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error(
        "Update card error:",
        error
      );

      setMessage(
        `Error: ${
          error.code ||
          error.message
        }`
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <main
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        <p>
          Loading digital card...
        </p>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <>
      <main
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        <h1>
          HodoDigiCard
        </h1>

        <p>
          Digital Identity in a Tap.
        </p>

        <h2>
          Edit Digital Card
        </h2>

        {/* =====================================================
            LIVE PREVIEW BUTTON
        ====================================================== */}

        <div
          style={{
            background: "#eff6ff",
            border:
              "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <strong>
            See your card as you build it
          </strong>

          <p
            style={{
              margin:
                "6px 0 12px",
              color: "#4b5563",
              fontSize: "14px",
            }}
          >
            Changes you make in the
            editor can be viewed in
            the live preview before
            you save.
          </p>

          <button
            type="button"
            onClick={() =>
              setShowPreview(true)
            }
            style={{
              padding:
                "11px 18px",
              border: "none",
              borderRadius: "9px",
              background:
                "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            👁 Live Preview
          </button>
        </div>

        {/* =====================================================
            MESSAGE
        ====================================================== */}

        {message && (
          <p
            style={{
              padding: "10px",
              background:
                "#f3f4f6",
              borderRadius: "8px",
            }}
          >
            {message}
          </p>
        )}

        {!message.includes(
          "do not have access"
        ) && (
          <form
            onSubmit={
              handleSubmit
            }
          >
            {/* =================================================
                TEMPLATE
            ================================================== */}

            <h3>
              Card Template
            </h3>

            <label>
              Choose a template
              <br />

              <select
                value={template}
                onChange={(e) =>
                  setTemplate(
                    e.target.value
                  )
                }
                style={{
                  marginTop: "8px",
                  padding: "8px",
                  minWidth:
                    "220px",
                }}
              >
                <option value="classic">
                  Classic
                </option>

                <option value="minimal">
                  Minimal
                </option>

                <option value="creator">
                  Creator
                </option>

                <option value="business">
                  Business
                </option>
              </select>
            </label>

            <br />
            <br />

            {/* =================================================
                BASIC INFORMATION
            ================================================== */}

            <h3>
              Basic Information
            </h3>

            <label>
              Name
              <br />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
              />
            </label>

            <br />
            <br />

            <label>
              Title / Profession
              <br />

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            <label>
              Short Bio
              <br />

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(
                    e.target.value
                  )
                }
                rows="4"
              />
            </label>

            <br />
            <br />

            {/* =================================================
                CONTACT
            ================================================== */}

            <h3>
              Contact Information
            </h3>

            <label>
              Phone
              <br />

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            <label>
              Contact Email
              <br />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            <label>
              Address
              <br />

              <textarea
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                rows="3"
              />
            </label>

            <br />
            <br />

            {/* =================================================
                SOCIAL & WEB
            ================================================== */}

            <h3>
              Social & Web
            </h3>

            <label>
              Website
              <br />

              <input
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) =>
                  setWebsite(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            <label>
              Facebook
              <br />

              <input
                type="url"
                placeholder="https://facebook.com/..."
                value={facebook}
                onChange={(e) =>
                  setFacebook(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            <label>
              Instagram
              <br />

              <input
                type="url"
                placeholder="https://instagram.com/..."
                value={instagram}
                onChange={(e) =>
                  setInstagram(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            <label>
              TikTok
              <br />

              <input
                type="url"
                placeholder="https://tiktok.com/@..."
                value={tiktok}
                onChange={(e) =>
                  setTiktok(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            <label>
              LinkedIn
              <br />

              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={linkedin}
                onChange={(e) =>
                  setLinkedin(
                    e.target.value
                  )
                }
              />
            </label>

            <br />
            <br />

            {/* =================================================
                ADDITIONAL LINKS
            ================================================== */}

            <h3>
              Additional Links
            </h3>

            <p>
              Add links to stores,
              booking pages,
              portfolios,
              menus, forms, or
              anything else you
              want visitors to
              access.
            </p>

            {additionalLinks.map(
              (link, index) => (
                <div
                  key={index}
                  style={{
                    border:
                      "1px solid #d1d5db",
                    borderRadius:
                      "10px",
                    padding:
                      "15px",
                    marginBottom:
                      "15px",
                  }}
                >
                  <label>
                    Link Name
                    <br />

                    <input
                      type="text"
                      placeholder="My Shopee Store"
                      value={
                        link.label ||
                        ""
                      }
                      onChange={(e) =>
                        updateLink(
                          index,
                          "label",
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <br />
                  <br />

                  <label>
                    URL
                    <br />

                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={
                        link.url ||
                        ""
                      }
                      onChange={(e) =>
                        updateLink(
                          index,
                          "url",
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <br />
                  <br />

                  <button
                    type="button"
                    onClick={() =>
                      removeLink(
                        index
                      )
                    }
                  >
                    Remove Link
                  </button>
                </div>
              )
            )}

            <button
              type="button"
              onClick={addLink}
            >
              + Add Another Link
            </button>

            <br />
            <br />

            {/* =================================================
                GALLERY
            ================================================== */}

            <h3>
              Photos & Gallery
            </h3>

            <p>
              Add photos that
              visitors can see on
              your public card.
            </p>

            <div
              style={{
                border:
                  "1px solid #d1d5db",
                borderRadius:
                  "10px",
                padding: "15px",
                marginBottom:
                  "20px",
              }}
            >
              <label>
                Gallery Image
                <br />

                <input
                  id="gallery-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGalleryFile(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                />
              </label>

              <br />
              <br />

              <label>
                Title
                <br />

                <input
                  type="text"
                  placeholder="Test Portfolio"
                  value={
                    galleryTitle
                  }
                  onChange={(e) =>
                    setGalleryTitle(
                      e.target.value
                    )
                  }
                />
              </label>

              <br />
              <br />

              <label>
                Description
                <br />

                <textarea
                  rows="3"
                  placeholder="Describe this portfolio item..."
                  value={
                    galleryDescription
                  }
                  onChange={(e) =>
                    setGalleryDescription(
                      e.target.value
                    )
                  }
                />
              </label>

              <br />
              <br />

              <button
                type="button"
                onClick={
                  handleGalleryUpload
                }
                disabled={
                  uploadingGallery
                }
              >
                {uploadingGallery
                  ? "Uploading..."
                  : "Upload to Gallery"}
              </button>
            </div>

            {/* EXISTING GALLERY */}

            <h4>
              Existing Gallery
            </h4>

            {gallery.length === 0 ? (
              <p>
                No gallery items yet.
              </p>
            ) : (
              gallery.map(
                (item) => (
                  <div
                    key={item.id}
                    style={{
                      border:
                        "1px solid #d1d5db",
                      borderRadius:
                        "10px",
                      padding: "12px",
                      marginBottom:
                        "12px",
                    }}
                  >
                    {item.imageUrl && (
                      <img
                        src={
                          item.imageUrl
                        }
                        alt={
                          item.title ||
                          "Gallery image"
                        }
                        style={{
                          width:
                            "120px",
                          height:
                            "120px",
                          objectFit:
                            "cover",
                          borderRadius:
                            "8px",
                          display:
                            "block",
                          marginBottom:
                            "8px",
                        }}
                      />
                    )}

                    <strong>
                      {item.title}
                    </strong>

                    {item.description && (
                      <p>
                        {
                          item.description
                        }
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveGalleryItem(
                          item.id
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                )
              )
            )}

            <br />
            <br />

            {/* =================================================
                PRODUCTS / SERVICES
            ================================================== */}

            <h3>
              Products & Services
            </h3>

            <p>
              Add products, services,
              packages, offers, or
              other things you want
              visitors to explore.
            </p>

            <div
              style={{
                border:
                  "1px solid #d1d5db",
                borderRadius:
                  "10px",
                padding: "15px",
                marginBottom:
                  "20px",
              }}
            >
              <h4>
                Add Product or Service
              </h4>

              <label>
                Product / Service Image
                <br />

                <input
                  id="product-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProductFile(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                />
              </label>

              <br />
              <br />

              <label>
                Product / Service Name
                <br />

                <input
                  type="text"
                  placeholder="Custom Button Badge"
                  value={
                    productName
                  }
                  onChange={(e) =>
                    setProductName(
                      e.target.value
                    )
                  }
                  style={{
                    width:
                      "100%",
                    boxSizing:
                      "border-box",
                  }}
                />
              </label>

              <br />
              <br />

              <label>
                Description
                <br />

                <textarea
                  rows="3"
                  placeholder="Describe your product or service..."
                  value={
                    productDescription
                  }
                  onChange={(e) =>
                    setProductDescription(
                      e.target.value
                    )
                  }
                  style={{
                    width:
                      "100%",
                    boxSizing:
                      "border-box",
                  }}
                />
              </label>

              <br />
              <br />

              <label>
                Price
                <br />

                <input
                  type="text"
                  placeholder="₱150"
                  value={
                    productPrice
                  }
                  onChange={(e) =>
                    setProductPrice(
                      e.target.value
                    )
                  }
                />
              </label>

              <br />
              <br />

              <label>
                Product / Service Link
                <br />

                <input
                  type="url"
                  placeholder="https://example.com/order"
                  value={
                    productLink
                  }
                  onChange={(e) =>
                    setProductLink(
                      e.target.value
                    )
                  }
                  style={{
                    width:
                      "100%",
                    boxSizing:
                      "border-box",
                  }}
                />

                <small
                  style={{
                    display:
                      "block",
                    marginTop:
                      "6px",
                    color:
                      "#6b7280",
                    lineHeight:
                      1.5,
                  }}
                >
                  Where should visitors
                  go when they want to
                  order, book, inquire,
                  or learn more?
                </small>
              </label>

              <br />
              <br />

              <button
                type="button"
                onClick={
                  handleProductUpload
                }
                disabled={
                  uploadingProduct
                }
              >
                {uploadingProduct
                  ? "Uploading..."
                  : "Add Product / Service"}
              </button>
            </div>

            {/* EXISTING PRODUCTS */}

            <h4>
              Existing Products &
              Services
            </h4>

            {products.length === 0 ? (
              <p>
                No products or services
                yet.
              </p>
            ) : (
              products.map(
                (product) => (
                  <div
                    key={
                      product.id
                    }
                    style={{
                      border:
                        "1px solid #d1d5db",
                      borderRadius:
                        "10px",
                      padding:
                        "12px",
                      marginBottom:
                        "12px",
                    }}
                  >
                    {product.imageUrl && (
                      <img
                        src={
                          product.imageUrl
                        }
                        alt={
                          product.name
                        }
                        style={{
                          width:
                            "120px",
                          height:
                            "120px",
                          objectFit:
                            "cover",
                          borderRadius:
                            "8px",
                          display:
                            "block",
                          marginBottom:
                            "8px",
                        }}
                      />
                    )}

                    <strong>
                      {
                        product.name
                      }
                    </strong>

                    {product.price && (
                      <p>
                        <strong>
                          {
                            product.price
                          }
                        </strong>
                      </p>
                    )}

                    {product.description && (
                      <p>
                        {
                          product.description
                        }
                      </p>
                    )}

                    {product.link && (
                      <p>
                        <a
                          href={
                            product.link
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View / Order
                        </a>
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveProduct(
                          product
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                )
              )
            )}

            <br />
            <br />

            {/* =================================================
                SAVE
            ================================================== */}

            <button
              type="submit"
              disabled={saving}
              style={{
                padding:
                  "12px 20px",
                borderRadius:
                  "9px",
                border: "none",
                background:
                  "#111827",
                color:
                  "#ffffff",
                fontWeight:
                  "600",
                cursor:
                  saving
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </form>
        )}

        <br />

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Cancel
        </button>
      </main>

      {/* ========================================================
          LIVE PREVIEW
      ========================================================= */}

      {showPreview && (
        <LiveCardPreview
          name={name}
          title={title}
          bio={bio}
          phone={phone}
          email={email}
          address={address}
          website={website}
          facebook={facebook}
          instagram={instagram}
          tiktok={tiktok}
          linkedin={linkedin}
          additionalLinks={
            additionalLinks
          }
          gallery={gallery}
          products={products}
          template={template}
          onClose={() =>
            setShowPreview(false)
          }
        />
      )}
    </>
  );
}

export default EditCard;