function MinimalTemplate({ card }) {
  const gallery = card.gallery || [];
  const products = card.products || [];
  const additionalLinks =
    card.additionalLinks || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#171717",
        padding: "40px 20px",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <main
        style={{
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            paddingBottom: "40px",
            borderBottom:
              "1px solid #e5e5e5",
          }}
        >
          {card.profileImageUrl ? (
            <img
              src={card.profileImageUrl}
              alt={card.name}
              style={{
                width: "96px",
                height: "96px",
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "24px",
              }}
            />
          ) : (
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                background: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                marginBottom: "24px",
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
              fontSize: "42px",
              margin: "0 0 8px",
              letterSpacing: "-1px",
            }}
          >
            {card.name}
          </h1>

          {card.title && (
            <p
              style={{
                fontSize: "18px",
                color: "#666",
                margin: 0,
              }}
            >
              {card.title}
            </p>
          )}

          {card.bio && (
            <p
              style={{
                marginTop: "24px",
                lineHeight: 1.7,
                maxWidth: "560px",
                color: "#444",
              }}
            >
              {card.bio}
            </p>
          )}
        </header>

        {/* QUICK ACTIONS */}

        <section
          style={{
            padding: "30px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {card.phone && (
              <a
                href={`tel:${card.phone}`}
                style={{
                  padding: "10px 16px",
                  border:
                    "1px solid #171717",
                  borderRadius: "6px",
                  color: "#171717",
                  textDecoration: "none",
                }}
              >
                Call
              </a>
            )}

            {card.email && (
              <a
                href={`mailto:${card.email}`}
                style={{
                  padding: "10px 16px",
                  border:
                    "1px solid #171717",
                  borderRadius: "6px",
                  color: "#171717",
                  textDecoration: "none",
                }}
              >
                Email
              </a>
            )}

            {card.website && (
              <a
                href={card.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 16px",
                  border:
                    "1px solid #171717",
                  borderRadius: "6px",
                  color: "#171717",
                  textDecoration: "none",
                }}
              >
                Website
              </a>
            )}
          </div>
        </section>

        {/* ADDITIONAL LINKS */}

        {additionalLinks.length > 0 && (
          <section
            style={{
              padding: "10px 0 35px",
            }}
          >
            <h2
              style={{
                marginBottom: "16px",
              }}
            >
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
                        border:
                          "1px solid #171717",
                        borderRadius: "6px",
                        color: "#171717",
                        textDecoration:
                          "none",
                        fontWeight: "600",
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

        {/* GALLERY */}

        {gallery.length > 0 && (
          <section
            style={{
              padding:
                "20px 0 35px",
            }}
          >
            <h2>Selected Work</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, 1fr)",
                gap: "14px",
              }}
            >
              {gallery.map(
                (item) => (
                  <article
                    key={item.id}
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: "100%",
                          aspectRatio: "1",
                          objectFit:
                            "cover",
                          borderRadius:
                            "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          aspectRatio: "1",
                          background:
                            "#f3f3f3",
                          borderRadius:
                            "8px",
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color: "#999",
                        }}
                      >
                        Image
                      </div>
                    )}

                    <h3>
                      {item.title}
                    </h3>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* PRODUCTS */}

        {products.length > 0 && (
          <section
            style={{
              padding:
                "20px 0 35px",
            }}
          >
            <h2>
              Products &
              Services
            </h2>

            {products.map(
              (product) => (
                <article
                  key={product.id}
                  style={{
                    padding:
                      "18px 0",
                    borderBottom:
                      "1px solid #e5e5e5",
                  }}
                >
                  <h3>
                    {product.name}
                  </h3>

                  {product.description && (
                    <p
                      style={{
                        color: "#666",
                        lineHeight: 1.6,
                      }}
                    >
                      {
                        product.description
                      }
                    </p>
                  )}

                  {product.price && (
                    <strong>
                      {product.price}
                    </strong>
                  )}
                </article>
              )
            )}
          </section>
        )}

        {/* FOOTER */}

        <footer
          style={{
            paddingTop: "30px",
            borderTop:
              "1px solid #e5e5e5",
            color: "#888",
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

export default MinimalTemplate;