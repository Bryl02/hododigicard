import { useEffect, useState } from "react";

function ClassicTemplate({ card }) {
  const gallery = card.gallery || [];
  const products = card.products || [];
  const additionalLinks =
    card.additionalLinks || [];

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [shareMessage, setShareMessage] =
    useState("");

  // =========================
  // PUBLIC CARD URL
  // =========================

  const cardUrl =
    window.location.href;

  // =========================
  // SHARE CARD
  // =========================

  async function handleShare() {
    const shareTitle = card.name
  ? card.name + " — HodoDigiCard"
  : "HodoDigiCard";

const shareText = card.title
  ? card.title
  : "Check out my digital card.";

const shareData = {
  title: shareTitle,
  text: shareText,
  url: cardUrl,
};

    try {
      // Use native phone/browser share
      if (
        navigator.share &&
        typeof navigator.share === "function"
      ) {
        await navigator.share(shareData);
        return;
      }

      // Fallback: copy URL
      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(
          cardUrl
        );

        setShareMessage(
          "Card link copied!"
        );

        setTimeout(() => {
          setShareMessage("");
        }, 2500);

        return;
      }

      // Older browser fallback
      const textArea =
        document.createElement("textarea");

      textArea.value = cardUrl;

      document.body.appendChild(
        textArea
      );

      textArea.select();

      document.execCommand("copy");

      document.body.removeChild(
        textArea
      );

      setShareMessage(
        "Card link copied!"
      );

      setTimeout(() => {
        setShareMessage("");
      }, 2500);
    } catch (error) {
      // User cancelled native share.
      // Do not show an error for cancellation.
      if (
        error?.name ===
        "AbortError"
      ) {
        return;
      }

      console.error(
        "Share error:",
        error
      );

      setShareMessage(
        "Unable to share. Please copy the page link."
      );

      setTimeout(() => {
        setShareMessage("");
      }, 3000);
    }
  }

  // =========================
  // EMAIL
  // =========================

  // =========================
  // SAVE CONTACT / VCF
  // =========================

  function handleSaveContact() {
    const fullName =
      card.name || "HodoDigiCard Contact";

    const vcardLines = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:" + escapeVCardValue(fullName),
];

if (card.phone) {
  vcardLines.push(
    "TEL:" + escapeVCardValue(card.phone)
  );
}

if (card.email) {
  vcardLines.push(
    "EMAIL:" + escapeVCardValue(card.email)
  );
}

if (card.website) {
  vcardLines.push(
    "URL:" + escapeVCardValue(card.website)
  );
}

if (card.address) {
  vcardLines.push(
    "ADR:;;" +
      escapeVCardValue(card.address) +
      ";;;;"
  );
}

if (card.title) {
  vcardLines.push(
    "TITLE:" + escapeVCardValue(card.title)
  );
}

    vcardLines.push(
      "END:VCARD"
    );

    const vcard =
      vcardLines.join("\r\n");

    const blob = new Blob(
      [vcard],
      {
        type:
          "text/vcard;charset=utf-8",
      }
    );

    const downloadUrl =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = downloadUrl;

    link.download =
  sanitizeFileName(fullName) + ".vcf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(
      downloadUrl
    );
  }

  // =========================
  // VCF HELPERS
  // =========================

  function escapeVCardValue(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function sanitizeFileName(value) {
    return String(value || "contact")
      .replace(
        /[<>:"/\\|?*]/g,
        ""
      )
      .trim()
      .replace(/\s+/g, "_");
  }

  // =========================
  // IMAGE LIGHTBOX
  // =========================

  function openImage(imageUrl, title) {
    setSelectedImage({
      url: imageUrl,
      title:
        title || "Image",
    });
  }

  function closeImage() {
    setSelectedImage(null);
  }

  // Prevent page scrolling while
  // image viewer is open.
  useEffect(() => {
    if (!selectedImage) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow =
      "hidden";

    function handleEscape(event) {
      if (
        event.key === "Escape"
      ) {
        closeImage();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedImage]);

  return (
    <>
      {/* =========================
          FULL-SCREEN IMAGE VIEWER
      ========================= */}

      {selectedImage && (
        <div
          onClick={closeImage}
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeImage();
            }}
            aria-label="Close image"
            style={{
              position: "fixed",
              top: "18px",
              right: "18px",
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "none",
              background:
                "rgba(255,255,255,0.18)",
              color: "#ffffff",
              fontSize: "26px",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ×
          </button>

          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              maxWidth: "95vw",
              maxHeight: "90vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow:
                "0 10px 50px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      {/* =========================
          MAIN PAGE
      ========================= */}

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f6f8",
          padding: "20px 12px 40px",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <main
          style={{
            maxWidth: "520px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow:
              "0 10px 35px rgba(0,0,0,0.10)",
          }}
        >

          {/* =========================
              HERO
          ========================= */}

          <section
            style={{
              background:
                "linear-gradient(135deg, #111827, #374151)",
              color: "#ffffff",
              padding:
                "42px 28px 36px",
              textAlign: "center",
            }}
          >
            {card.profileImageUrl ? (
              <img
                src={card.profileImageUrl}
                alt={card.name}
                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border:
                    "4px solid rgba(255,255,255,0.8)",
                  marginBottom: "18px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  background:
                    "rgba(255,255,255,0.15)",
                  border:
                    "4px solid rgba(255,255,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  margin:
                    "0 auto 18px",
                  fontSize: "42px",
                }}
              >
                {card.name
                  ? card.name
                      .charAt(0)
                      .toUpperCase()
                  : "H"}
              </div>
            )}

            <h1
              style={{
                margin: "0 0 8px",
                fontSize: "30px",
              }}
            >
              {card.name}
            </h1>

            {card.title && (
              <p
                style={{
                  margin: "0",
                  fontSize: "16px",
                  opacity: 0.85,
                }}
              >
                {card.title}
              </p>
            )}

            {card.bio && (
              <p
                style={{
                  margin:
                    "18px auto 0",
                  lineHeight: 1.6,
                  maxWidth: "420px",
                  opacity: 0.92,
                }}
              >
                {card.bio}
              </p>
            )}
          </section>

          {/* =========================
              QUICK ACTIONS
          ========================= */}

          <section
            style={{
              padding:
                "22px 20px 8px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent:
                "center",
            }}
          >

            <button
              type="button"
              onClick={handleShare}
              style={{
                textDecoration: "none",
                padding:
                  "11px 18px",
                borderRadius: "999px",
                background: "#111827",
                color: "#ffffff",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ↗ Share
            </button>

            {card.phone && (
              <a
                href={"tel:" + card.phone}
                style={{
                  textDecoration: "none",
                  padding:
                    "11px 18px",
                  borderRadius: "999px",
                  background:
                    "#111827",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                📞 Call
              </a>
            )}

            {card.email && (
              <a
  href={"mailto:" + card.email}
  style={{
    textDecoration: "none",
    padding: "11px 18px",
    borderRadius: "999px",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px",
    display: "inline-block",
  }}
>
  ✉️ Email
</a>
            )}

            <button
              type="button"
              onClick={
                handleSaveContact
              }
              style={{
                textDecoration:
                  "none",
                padding:
                  "11px 18px",
                borderRadius:
                  "999px",
                background:
                  "#111827",
                color:
                  "#ffffff",
                fontWeight:
                  "600",
                border:
                  "none",
                cursor:
                  "pointer",
                fontSize:
                  "14px",
              }}
            >
              👤 Save Contact
            </button>

            {card.website && (
              <a
                href={card.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration:
                    "none",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "999px",
                  background:
                    "#111827",
                  color:
                    "#ffffff",
                  fontWeight:
                    "600",
                }}
              >
                🌐 Website
              </a>
            )}
          </section>

          {shareMessage && (
            <p
              style={{
                textAlign:
                  "center",
                margin:
                  "8px 20px 0",
                fontSize:
                  "13px",
                color:
                  "#16a34a",
                fontWeight:
                  "600",
              }}
            >
              {shareMessage}
            </p>
          )}

          {/* =========================
              CONTACT
          ========================= */}

          {(card.address ||
            card.phone ||
            card.email) && (
            <section
              style={{
                padding:
                  "24px 28px 8px",
              }}
            >
              <h2
                style={{
                  fontSize:
                    "18px",
                  marginBottom:
                    "14px",
                }}
              >
                Contact
              </h2>

              {card.phone && (
                <p>
                  📞{" "}
                  <a
                    href={"tel:" + card.phone}
                    style={{
                      color:
                        "#111827",
                    }}
                  >
                    {card.phone}
                  </a>
                </p>
              )}

              {card.email && (
                <p>
                  ✉️{" "}
                  <a
                    href={"mailto:" + card.email}
                    style={{
                      color:
                        "#111827",
                    }}
                  >
                    {card.email}
                  </a>
                </p>
              )}

              {card.address && (
                <p>
                  📍 {card.address}
                </p>
              )}
            </section>
          )}

          {/* =========================
              SOCIAL
          ========================= */}

          {(card.facebook ||
            card.instagram ||
            card.tiktok ||
            card.linkedin) && (
            <section
              style={{
                padding:
                  "24px 28px 8px",
              }}
            >
              <h2
                style={{
                  fontSize:
                    "18px",
                  marginBottom:
                    "14px",
                }}
              >
                Connect
              </h2>

              <div
                style={{
                  display:
                    "flex",
                  flexWrap:
                    "wrap",
                  gap: "10px",
                }}
              >
                {card.facebook && (
                  <a
                    href={
                      card.facebook
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration:
                        "none",
                      padding:
                        "10px 14px",
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "12px",
                      color:
                        "#111827",
                    }}
                  >
                    Facebook
                  </a>
                )}

                {card.instagram && (
                  <a
                    href={
                      card.instagram
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration:
                        "none",
                      padding:
                        "10px 14px",
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "12px",
                      color:
                        "#111827",
                    }}
                  >
                    Instagram
                  </a>
                )}

                {card.tiktok && (
                  <a
                    href={
                      card.tiktok
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration:
                        "none",
                      padding:
                        "10px 14px",
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "12px",
                      color:
                        "#111827",
                    }}
                  >
                    TikTok
                  </a>
                )}

                {card.linkedin && (
                  <a
                    href={
                      card.linkedin
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration:
                        "none",
                      padding:
                        "10px 14px",
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "12px",
                      color:
                        "#111827",
                    }}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </section>
          )}

          {/* =========================
              ADDITIONAL LINKS
          ========================= */}

          {additionalLinks.length >
            0 && (
            <section
              style={{
                padding:
                  "28px 20px 8px",
              }}
            >
              <h2
                style={{
                  fontSize:
                    "20px",
                  margin:
                    "0 8px 16px",
                }}
              >
                More Links
              </h2>

              <div
                style={{
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  gap: "10px",
                }}
              >
                {additionalLinks.map(
                  (
                    link,
                    index
                  ) => (
                    <a
                      key={
                        index
                      }
                      href={
                        link.url
                      }
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display:
                          "block",
                        padding:
                          "14px 16px",
                        borderRadius:
                          "12px",
                        border:
                          "1px solid #e5e7eb",
                        textDecoration:
                          "none",
                        color:
                          "#111827",
                        fontWeight:
                          "600",
                        background:
                          "#fafafa",
                      }}
                    >
                      🔗{" "}
                      {link.label ||
                        link.url}
                    </a>
                  )
                )}
              </div>
            </section>
          )}

          {/* =========================
              GALLERY
          ========================= */}

          {gallery.length >
            0 && (
            <section
              style={{
                padding:
                  "28px 20px 8px",
              }}
            >
              <h2
                style={{
                  fontSize:
                    "20px",
                  margin:
                    "0 8px 16px",
                }}
              >
                Gallery
              </h2>

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {gallery.map(
                  (item) => (
                    <article
                      key={
                        item.id
                      }
                      style={{
                        border:
                          "1px solid #e5e7eb",
                        borderRadius:
                          "16px",
                        overflow:
                          "hidden",
                      }}
                    >
                      {item.imageUrl ? (
                        <button
                          type="button"
                          onClick={() =>
                            openImage(
                              item.imageUrl,
                              item.title
                            )
                          }
                          style={{
                            display:
                              "block",
                            width:
                              "100%",
                            padding:
                              0,
                            border:
                              "none",
                            background:
                              "none",
                            cursor:
                              "zoom-in",
                          }}
                          aria-label={
  "Open " +
  (item.title || "gallery image")
}
                        >
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
                                "100%",
                              aspectRatio:
                                "1 / 1",
                              objectFit:
                                "cover",
                              display:
                                "block",
                            }}
                          />
                        </button>
                      ) : (
                        <div
                          style={{
                            aspectRatio:
                              "1 / 1",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            background:
                              "#f3f4f6",
                            color:
                              "#9ca3af",
                            fontSize:
                              "13px",
                          }}
                        >
                          Image coming soon
                        </div>
                      )}

                      <div
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        <strong>
                          {
                            item.title
                          }
                        </strong>

                        {item.description && (
                          <p
                            style={{
                              margin:
                                "6px 0 0",
                              fontSize:
                                "13px",
                              color:
                                "#6b7280",
                            }}
                          >
                            {
                              item.description
                            }
                          </p>
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>
            </section>
          )}

          {/* =========================
              PRODUCTS & SERVICES
          ========================= */}

          {products.length >
            0 && (
            <section
              style={{
                padding:
                  "28px 20px 8px",
              }}
            >
              <h2
                style={{
                  fontSize:
                    "20px",
                  margin:
                    "0 8px 16px",
                }}
              >
                Products & Services
              </h2>

              {products.map(
                (product) => (
                  <article
                    key={
                      product.id
                    }
                    style={{
                      display:
                        "flex",
                      gap: "14px",
                      padding:
                        "14px",
                      marginBottom:
                        "12px",
                      border:
                        "1px solid #e5e7eb",
                      borderRadius:
                        "16px",
                    }}
                  >
                    {product.imageUrl ? (
                      <button
                        type="button"
                        onClick={() =>
                          openImage(
                            product.imageUrl,
                            product.name
                          )
                        }
                        style={{
                          padding:
                            0,
                          border:
                            "none",
                          background:
                            "none",
                          flexShrink:
                            0,
                          cursor:
                            "zoom-in",
                        }}
                        aria-label={
  "Open " +
  (product.name || "product image")
}
                      >
                        <img
                          src={
                            product.imageUrl
                          }
                          alt={
                            product.name
                          }
                          style={{
                            width:
                              "90px",
                            height:
                              "90px",
                            objectFit:
                              "cover",
                            borderRadius:
                              "12px",
                            display:
                              "block",
                          }}
                        />
                      </button>
                    ) : (
                      <div
                        style={{
                          width:
                            "90px",
                          height:
                            "90px",
                          flexShrink:
                            0,
                          borderRadius:
                            "12px",
                          background:
                            "#f3f4f6",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color:
                            "#9ca3af",
                          fontSize:
                            "12px",
                          textAlign:
                            "center",
                        }}
                      >
                        Product image
                      </div>
                    )}

                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <h3
                        style={{
                          margin:
                            "0 0 6px",
                          fontSize:
                            "16px",
                        }}
                      >
                        {
                          product.name
                        }
                      </h3>

                      {product.description && (
                        <p
                          style={{
                            margin:
                              "0 0 8px",
                            fontSize:
                              "13px",
                            color:
                              "#6b7280",
                            lineHeight:
                              1.5,
                          }}
                        >
                          {
                            product.description
                          }
                        </p>
                      )}

                      {product.price && (
                        <strong
                          style={{
                            display:
                              "block",
                            marginBottom:
                              "10px",
                            fontSize:
                              "16px",
                          }}
                        >
                          {
                            product.price
                          }
                        </strong>
                      )}

                      {product.link && (
                        <a
                          href={
                            product.link
                          }
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display:
                              "inline-block",
                            padding:
                              "9px 14px",
                            borderRadius:
                              "10px",
                            background:
                              "#111827",
                            color:
                              "#ffffff",
                            textDecoration:
                              "none",
                            fontSize:
                              "13px",
                            fontWeight:
                              "600",
                          }}
                        >
                          View / Order →
                        </a>
                      )}
                    </div>
                  </article>
                )
              )}
            </section>
          )}

          {/* =========================
              FOOTER
          ========================= */}

          <footer
            style={{
              marginTop:
                "30px",
              padding:
                "24px",
              textAlign:
                "center",
              borderTop:
                "1px solid #eee",
              color:
                "#6b7280",
            }}
          >
            <strong
              style={{
                color:
                  "#111827",
              }}
            >
              HodoDigiCard
            </strong>

            <br />

            <small>
              Digital Identity in a Tap.
            </small>
          </footer>
        </main>
      </div>
    </>
  );
}

export default ClassicTemplate;