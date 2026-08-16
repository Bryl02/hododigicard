function CreatorTemplate({ card }) {
  const gallery = card.gallery || [];
  const products = card.products || [];
  const additionalLinks =
    card.additionalLinks || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#ffffff",
        padding: "12px",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <main
        style={{
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            minHeight: "460px",
            borderRadius: "24px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            background:
              "linear-gradient(160deg, #27272a, #09090b)",
          }}
        >
          {card.profileImageUrl ? (
            <img
              src={card.profileImageUrl}
              alt={card.name}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "24px",
                marginBottom: "24px",
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "24px",
                background: "#333333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
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
              fontSize: "40px",
              margin: "0",
            }}
          >
            {card.name}
          </h1>

          {card.title && (
            <p
              style={{
                fontSize: "18px",
                color: "#bbbbbb",
                margin: "8px 0 0",
              }}
            >
              {card.title}
            </p>
          )}

          {card.bio && (
            <p
              style={{
                lineHeight: 1.6,
                color: "#dddddd",
              }}
            >
              {card.bio}
            </p>
          )}
        </section>

        {/* QUICK ACTIONS */}

        <section
          style={{
            padding: "28px 8px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            {card.phone && (
              <a
                href={`tel:${card.phone}`}
                style={{
                  padding: "14px 6px",
                  background: "#222",
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                📞
                <br />
                Call
              </a>
            )}

            {card.email && (
              <a
                href={`mailto:${card.email}`}
                style={{
                  padding: "14px 6px",
                  background: "#222",
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                ✉️
                <br />
                Email
              </a>
            )}

            {card.website && (
              <a
                href={card.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "14px 6px",
                  background: "#222",
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                🌐
                <br />
                Web
              </a>
            )}
          </div>
        </section>

        {/* SOCIAL */}

        {(card.instagram ||
          card.facebook ||
          card.tiktok ||
          card.linkedin) && (
          <section
            style={{
              padding:
                "10px 8px 28px",
            }}
          >
            <h2>
              Follow / Connect
            </h2>

            {card.instagram && (
              <p>
                <a
                  href={card.instagram}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                  }}
                >
                  Instagram →
                </a>
              </p>
            )}

            {card.facebook && (
              <p>
                <a
                  href={card.facebook}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                  }}
                >
                  Facebook →
                </a>
              </p>
            )}

            {card.tiktok && (
              <p>
                <a
                  href={card.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                  }}
                >
                  TikTok →
                </a>
              </p>
            )}

            {card.linkedin && (
              <p>
                <a
                  href={card.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                  }}
                >
                  LinkedIn →
                </a>
              </p>
            )}
          </section>
        )}

        {/* ADDITIONAL LINKS */}

        {additionalLinks.length > 0 && (
          <section
            style={{
              padding:
                "10px 8px 30px",
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
                          "14px 16px",
                        background: "#222",
                        color: "#fff",
                        borderRadius:
                          "12px",
                        textDecoration:
                          "none",
                        fontWeight: "600",
                      }}
                    >
                      {link.label ||
                        "View Link"}{" "}
                      →
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
                "10px 8px 30px",
            }}
          >
            <h2>
              My Work
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, 1fr)",
                gap: "8px",
              }}
            >
              {gallery.map(
                (item) => (
                  <div
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
                            "14px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          aspectRatio: "1",
                          borderRadius:
                            "14px",
                          background:
                            "#222",
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color: "#888",
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

        {/* PRODUCTS */}

        {products.length > 0 && (
          <section
            style={{
              padding:
                "10px 8px 30px",
            }}
          >
            <h2>
              What I Offer
            </h2>

            {products.map(
              (product) => (
                <article
                  key={product.id}
                  style={{
                    background:
                      "#222",
                    padding: "18px",
                    borderRadius:
                      "16px",
                    marginBottom:
                      "10px",
                  }}
                >
                  <h3>
                    {product.name}
                  </h3>

                  {product.description && (
                    <p
                      style={{
                        color: "#bbb",
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
            textAlign: "center",
            padding: "30px 0",
            color: "#777",
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

export default CreatorTemplate;