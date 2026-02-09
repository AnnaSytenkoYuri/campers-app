import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className="pageContainer">
        <div className={css.headerContent}>
        <Link href="/" className={css.logo}>
          <Image
            src="/images/TravelTrucks.svg"
            alt="Campers logo"
            width={136}
            height={15}
            priority
          />
        </Link>
        <div className={css.navWrapper}>
          <Navigation/>
        </div>
        </div>
      </div>
    </header>
  );
}
