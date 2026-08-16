import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDigitalCard } from "../services/cardService";
import { auth } from "../firebase";

function CreateCard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!auth.currentUser) {
      setMessage("You must be logged in.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await createDigitalCard(auth.currentUser.uid, {
        name,
        title,
        bio,
        phone,
        email,
        address,
      });

      setMessage("Digital card created successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error("Create card error:", error);
      setMessage(
        `Error: ${error.code || error.message}`
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <h1>HodoDigiCard</h1>

      <p>Digital Identity in a Tap.</p>

      <h2>Create Your Digital Card</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
          </label>
          <br />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Your name"
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="title">
            Title / Profession
          </label>
          <br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Entrepreneur, Teacher, Designer..."
          />
        </div>

        <br />

        <div>
          <label htmlFor="bio">
            Short Bio
          </label>
          <br />
          <textarea
            id="bio"
            value={bio}
            onChange={(event) =>
              setBio(event.target.value)
            }
            placeholder="Tell people a little about yourself"
            rows="4"
          />
        </div>

        <br />

        <div>
          <label htmlFor="phone">
            Phone
          </label>
          <br />
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="09XXXXXXXXX"
          />
        </div>

        <br />

        <div>
          <label htmlFor="email">
            Contact Email
          </label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="contact@example.com"
          />
        </div>

        <br />

        <div>
          <label htmlFor="address">
            Address
          </label>
          <br />
          <textarea
            id="address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            placeholder="Business or personal address"
            rows="3"
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Create Digital Card"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Cancel
      </button>
    </main>
  );
}

export default CreateCard;