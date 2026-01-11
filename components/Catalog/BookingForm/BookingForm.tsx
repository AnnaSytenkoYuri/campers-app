"use client";

import { useState } from "react";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Camper ${camperId} booked!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h2 className={css.title}>Book your camper van now</h2>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
      <div className={css.fields}>
        <label>
          Name
          <input
            className={css.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            className={css.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Comment
          <textarea
            className={css.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </div>
      <button className={css.button} type="submit">
        Book Now
      </button>
    </form>
  );
}
