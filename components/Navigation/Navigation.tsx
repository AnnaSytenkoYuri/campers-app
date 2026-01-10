import Link from "next/link";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navigationItem}>
          <Link
            href="/"
            prefetch={false}
            className={css.navigationLink}
          >
            Home
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link
            href="/catalog"
            prefetch={false}
            className={css.navigationLink}
          >
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
