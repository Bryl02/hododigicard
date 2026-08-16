import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDigitalCard } from "../services/cardService";

import ClassicTemplate from "../components/templates/ClassicTemplate";
import MinimalTemplate from "../components/templates/MinimalTemplate";
import CreatorTemplate from "../components/templates/CreatorTemplate";
import BusinessTemplate from "../components/templates/BusinessTemplate";

function PublicCard() {
  const { cardId } = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] =
    useState(true);
  const [message, setMessage] =
    useState("");

  useEffect(() => {
    async function loadCard() {
      try {
        const data =
          await getDigitalCard(cardId);

        if (!data.published) {
          setMessage(
            "This digital card is not published."
          );

          setLoading(false);
          return;
        }

        setCard(data);
      } catch (error) {
        console.error(
          "Public card error:",
          error
        );

        setMessage(
          "Digital card not found."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCard();
  }, [cardId]);

  if (loading) {
    return (
      <main
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <p>
          Loading HodoDigiCard...
        </p>
      </main>
    );
  }

  if (message) {
    return (
      <main
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1>
          HodoDigiCard
        </h1>

        <p>{message}</p>
      </main>
    );
  }

  switch (card.template) {
    case "minimal":
      return (
        <MinimalTemplate
          card={card}
        />
      );

    case "creator":
      return (
        <CreatorTemplate
          card={card}
        />
      );

    case "business":
      return (
        <BusinessTemplate
          card={card}
        />
      );

    case "classic":
    default:
      return (
        <ClassicTemplate
          card={card}
        />
      );
  }
}

export default PublicCard;