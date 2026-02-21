'use client';

import css from './Location.module.css';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Location = ({ value, onChange }: SearchProps) => {
  return (
    <div className={css.locationContainer}>
      <h3 className={css.locationTitle}>Location</h3>
      <input
        className={css.input}
        defaultValue={value}
        onChange={e => onChange(e.target.value)}
        type="text"
        placeholder="Kyiv, Ukraine"
      />
    </div>
  );
};

export default Location;