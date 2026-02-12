'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DayPicker, type NavProps } from 'react-day-picker';
import { addMonths, format } from 'date-fns';
import type { Locale, Day } from 'date-fns';
import { enUS } from 'date-fns/locale';

import css from './DatePicker.module.css';

type UnifiedChangeEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | { target: { name: string; value: string } };

type Props = {
  name?: string;
  id?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  onChange: (e: UnifiedChangeEvent) => void;
};

function toISO(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, '0');
  const day = String(x.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

type NavWithMonthProps = NavProps & {
  month: Date;
  locale: Locale;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

function getWeekdayLabels(locale: Locale, weekStartsOn: Day) {
  return Array.from({ length: 7 }, (_, i) => {
    const dayIndex = ((weekStartsOn + i) % 7) as Day;
    const label =
      locale.localize?.day(dayIndex, { width: 'abbreviated' }) ??
      String(dayIndex);

    return label.replace('.', '').slice(0, 3).toUpperCase();
  });
}

function NavWithMonth({
  month,
  onPreviousClick,
  onNextClick,
  previousMonth,
  nextMonth,
  locale,
  weekStartsOn,
}: NavWithMonthProps) {
  const weekdays = useMemo(
    () => getWeekdayLabels(locale, weekStartsOn),
    [locale, weekStartsOn]
  );

  return (
    <nav className="rdp-nav" aria-label="Navigation bar">
      <div className="nav-top">
        <button
          type="button"
          className="rdp-button_previous"
          disabled={!previousMonth}
          onClick={onPreviousClick}
          aria-label="Previous month"
        >
          <svg
            width="24"
            height="24"
            className={css.btnIcon}
            aria-hidden="true"
          >
            <use href="/sprite.svg#prev-arrow"></use>
          </svg>
        </button>

        <div className="rdp-caption">
          {format(month, 'LLLL yyyy', { locale })}
        </div>

        <button
          type="button"
          className="rdp-button_next"
          disabled={!nextMonth}
          onClick={onNextClick}
          aria-label="Next month"
        >
          <svg
            width="24"
            height="24"
            className={css.btnIcon}
            aria-hidden="true"
          >
            <use href="/sprite.svg#next-arrow"></use>
          </svg>
        </button>
      </div>

      <div className="weekdays" aria-hidden="true">
        {weekdays.map(d => (
          <span key={d} className="weekday">
            {d}
          </span>
        ))}
      </div>
    </nav>
  );
}

export default function DatePicker({
  name = 'date',
  id = 'date',
  value,
  placeholder = 'Booking date',
  required = false,
  className,
  onChange,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => {
    if (!value) return undefined;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }, [value]);

  const [month, setMonth] = useState<Date>(selected ?? new Date());
 
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!open) return;
      const el = wrapRef.current;
      if (!el) return;

      const target = e.target as Node | null;
      if (target && !el.contains(target)) setOpen(false);
    }

    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open]);

  const displayValue = useMemo(() => {
    if (!selected) return '';
    return format(selected, 'dd.MM.yyyy', { locale: enUS });
  }, [selected]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  return (
    <div ref={wrapRef} className={css.wrapper}>
      <input
        id={id}
        name={name}
        type="text"
        readOnly
        required={required}
        className={className}
        placeholder={placeholder}
        value={displayValue}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <div className={css.popover}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={date => {
              if (!date) return;
              if (date < today) return;

              onChange({ target: { name, value: toISO(date) } });
              setOpen(false);
            }}
            locale={enUS}
            weekStartsOn={1}
            showOutsideDays
            fixedWeeks
            month={month}
            onMonthChange={setMonth}
            components={{
              Nav: navProps => (
                <NavWithMonth
                  {...navProps}
                  month={month}
                  locale={enUS}
                  weekStartsOn={1}
                  onPreviousClick={() => setMonth(m => addMonths(m, -1))}
                  onNextClick={() => setMonth(m => addMonths(m, 1))}
                />
              ),
            }}
            disabled={{ before: today }}
            className={css.rdp}
          />
        </div>
      )}
    </div>
  );
}