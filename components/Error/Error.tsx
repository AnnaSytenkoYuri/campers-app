"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import css from './Error.module.css';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={css.errorPage}>
      <h1 className={css.title}>Something went wrong!</h1>
      <p className={css.message}>
        Sorry. An error occurred while processing your request.
      </p>
      <div className={css.actions}>
        <button onClick={reset} className="button button--primary">
          Try again
        </button>
        <Link href="/" className={css.link}>
          Go to homepage
        </Link>
      </div>
    </div>
  );
}