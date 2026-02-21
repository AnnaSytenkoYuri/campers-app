'use client';
import toast from 'react-hot-toast';
import css from './BookingForm.module.css';
import React from 'react';
import { useFormDraft } from '@/lib/store/draftStore';
import DatePicker from '@/components/Calendar/DatePicker';
import ButtonComponent from '@/components/Button/Button';


export default function BookingForm() {
  const { draft, setDraft, clearDraft } = useFormDraft();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setDraft({
      ...draft,
      [name]: value,
    });
  };


const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.success('Booking submitted successfully!');
    clearDraft();
}


  return (
    <div className={css.formContainer}>
      <div className={css.textContainer}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={css.input}
          placeholder="Name*"
          value={draft.name}
          onChange={handleChange}
        />

        <input
          id="email"
          name="email"
          type="email"
          required
          className={css.input}
          placeholder="Email*"
          value={draft.email}
          onChange={handleChange}
        />

        <DatePicker
          id="date"
          name="date"
          required
          className={`${css.input} ${css.date}`}
          placeholder="Booking date"
          value={draft.date}
          onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        />

        <textarea
          id="comment"
          name="comment"
          className={css.textarea}
          placeholder="Comment"
          value={draft.comment}
          onChange={handleChange}
        />

        <ButtonComponent type="submit" className="button button--primary">
          Send
        </ButtonComponent>
      </form>
    </div>
  );
}
