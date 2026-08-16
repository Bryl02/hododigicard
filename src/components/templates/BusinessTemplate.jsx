function BusinessTemplate({ card }) {
  const gallery = card.gallery || [];
  const products = card.products || [];
  const additionalLinks =
    card.additionalLinks || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef1f5",
        fontFamily:
          "Arial, Helvetica, sans-serif",
        color: "#1f2937",
        paddingBottom: "40px",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          background: "#1e3a5f",
          color: "#ffffff",
          padding: "36px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {card.profileImageUrl ? (
            <img
              src={card.profileImageUrl}
              alt={card.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "16px",
                background:
                  "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                flexShrink: 0,
              }}
            >
              {card.name
                ? card.name
                    .charAt(0)
                    .toUpperCase()
                : "H"}
            </div>
          )}

          <div>
            <h1
              style={{
                margin: "0 0 6px",
              }}
            >
              {card.name}
            </h1>

            {card.title && (
              <p
                style={{
                  margin: 0,
                  opacity: 0.85,
                }}
              >
                {card.title}
              </p>
            )}
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* ABOUT */}

        {card.bio && (
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <h2>
              About
            </h2>

            <p
              style={{
                lineHeight: 1.7,
              }}
            >
              {card.bio}
            </p>
          </section>
        )}

        {/* CONTACT */}

        <section
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            marginBottom: "16px",
          }}
        >
          <h2>
            Contact
          </h2>

          {card.phone && (
            <p>
              📞{" "}
              <a
                href={`tel:${card.phone}`}
              >
                {card.phone}
              </a>
            </p>
          )}

          {card.email && (
            <p>
              ✉️{" "}
              <a
                href={`mailto:${card.email}`}
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

        {/* ADDITIONAL LINKS */}

        {additionalLinks.length > 0 && (
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <h2>
              More Links
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {additionalLinks.map(
                (link, index) =>
                  link.url && (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "block",
                        padding:
                          "13px 16px",
                        background:
                          "#f8fafc",
                        border:
                          "1px solid #dbe1e8",
                        borderRadius:
                          "8px",
                        color:
                          "#1e3a5f",
                        textDecoration:
                          "none",
                        fontWeight:
                          "600",
                      }}
                    >
                      {link.label ||
                        "View Link"}{" "}
                      ↗
                    </a>
                  )
              )}
            </div>
          </section>
        )}

        {/* PRODUCTS */}

        {products.length > 0 && (
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <h2>
              Products &
              Services
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {products.map(
                (product) => (
                  <article
                    key={product.id}
                    style={{
                      border:
                        "1px solid #e5e7eb",
                      borderRadius:
                        "10px",
                      padding: "16px",
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
                          width: "100%",
                          aspectRatio:
                            "4 / 3",
                          objectFit:
                            "cover",
                          borderRadius:
                            "8px",
                        }}
                      />
                    )}

                    <h3>
                      {product.name}
                    </h3>

                    {product.description && (
                      <p>
                        {
                          product.description
                        }
                      </p>
                    )}

                    {product.price && (
                      <strong>
                        {
                          product.price
                        }
                      </strong>
                    )}
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* GALLERY */}

        {gallery.length > 0 && (
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <h2>
              Gallery
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              {gallery.map(
                (item) => (
                  <div
                    key={item.id}
                  >
                    {item.imageUrl ? (
                      <img
                        src={
                          item.imageUrl
                        }
                        alt={
                          item.title
                        }
                        style={{
                          width: "100%",
                          aspectRatio:
                            "1",
                          objectFit:
                            "cover",
                          borderRadius:
                            "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          aspectRatio:
                            "1",
                          background:
                            "#eef0f3",
                          borderRadius:
                            "8px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color:
                            "#9ca3af",
                        }}
                      >
                        Image
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* SOCIAL / WEB */}

        {(card.facebook ||
          card.instagram ||
          card.tiktok ||
          card.linkedin ||
          card.website) && (
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
            }}
          >
            <h2>
              Connect
            </h2>

            {card.website && (
              <p>
                <a
                  href={
                    card.website
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              </p>
            )}

            {card.facebook && (
              <p>
                <a
                  href={
                    card.facebook
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </p>
            )}

            {card.instagram && (
              <p>
                <a
                  href={
                    card.instagram
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </p>
            )}

            {card.tiktok && (
              <p>
                <a
                  href={card.tiktok}
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                </a>
              </p>
            )}

            {card.linkedin && (
              <p>
                <a
                  href={
                    card.linkedin
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </p>
            )}
          </section>
        )}

        {/* FOOTER */}

        <footer
          style={{
            textAlign: "center",
            padding:
              "30px 0 0",
            color: "#6b7280",
          }}
        >
          <strong>
            HodoDigiCard
          </strong>

          <br />

          <small>
            Digital Identity
            in a Tap.
          </small>
        </footer>
      </main>
    </div>
  );
}

export default BusinessTemplate;