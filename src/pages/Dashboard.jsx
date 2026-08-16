import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { logoutUser } from "../services/auth";

import {
  getUserCards,
  setCardPublished,
} from "../services/cardService";

function Dashboard() {
  const navigate = useNavigate();

  const [cards, setCards] =
    useState([]);

  const [loadingCards, setLoadingCards] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [publishingCardId, setPublishingCardId] =
    useState(null);

  const user = auth.currentUser;

  async function loadCards() {
    if (!user) {
      setLoadingCards(false);
      return;
    }

    try {
      const userCards =
        await getUserCards(
          user.uid
        );

      setCards(userCards);
    } catch (error) {
      console.error(
        "Error loading cards:",
        error
      );

      setMessage(error.message);
    } finally {
      setLoadingCards(false);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  async function handlePublish(card) {
    setPublishingCardId(card.id);
    setMessage("");

    try {
      await setCardPublished(
        card.id,
        !card.published
      );

      await loadCards();

      setMessage(
        card.published
          ? "Digital card unpublished."
          : "Digital card published!"
      );
    } catch (error) {
      console.error(
        "Publish error:",
        error
      );

      setMessage(error.message);
    } finally {
      setPublishingCardId(null);
    }
  }

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main>
      <h1>HodoDigiCard</h1>

      <p>
        Digital Identity in a Tap.
      </p>

      <hr />

      <h2>
        Welcome back!
      </h2>

      <p>
        You are signed in as:
        <br />
        <strong>
          {user?.email}
        </strong>
      </p>

      <section>
        <h3>
          Your Digital Cards
        </h3>

        {loadingCards ? (
          <p>
            Loading your digital cards...
          </p>
        ) : cards.length === 0 ? (
          <>
            <p>
              You don't have any digital
              cards yet.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/create-card"
                )
              }
            >
              + Create Digital Card
            </button>
          </>
        ) : (
          <>
            {cards.map((card) => (
              <article
                key={card.id}
              >
                <h4>
                  {card.name ||
                    "Untitled Card"}
                </h4>

                {card.title && (
                  <p>
                    {card.title}
                  </p>
                )}

                {card.bio && (
                  <p>
                    {card.bio}
                  </p>
                )}

                <p>
                  Status:{" "}
                  <strong>
                    {card.published
                      ? "Published"
                      : "Draft"}
                  </strong>
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/edit-card/${card.id}`
                    )
                  }
                >
                  Edit Card
                </button>

               
                <button
                  onClick={() =>
                    handlePublish(card)
                  }
                  disabled={
                    publishingCardId ===
                    card.id
                  }
                >
                  {publishingCardId ===
                  card.id
                    ? "Saving..."
                    : card.published
                    ? "Unpublish"
                    : "Publish"}
                </button>

                {card.published && (
                  <>
                    {" "}

                    <button
                      onClick={() =>
                        navigate(
                          `/card/${card.id}`
                        )
                      }
                    >
                      View Public Card
                    </button>
                  </>
                )}

                <hr />
              </article>
            ))}

            <button
              onClick={() =>
                navigate(
                  "/create-card"
                )
              }
            >
              + Create Another
              Digital Card
            </button>
          </>
        )}
      </section>

      <hr />

      <button
        onClick={handleLogout}
      >
        Log Out
      </button>

      {message && (
        <p>{message}</p>
      )}
    </main>
  );
}

export default Dashboard;