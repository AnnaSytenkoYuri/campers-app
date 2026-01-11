"use client";
import { useRouter } from "next/navigation";
import css from "./HeroBlock.module.css";
export default function HeroBlock() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/catalog");
  };

  return (
    <section className={css.heroBlock}>
      <div className={css.heroContent}>
        <h1 className={css.heroTitle}>Campers of your dreams</h1>
        <p className={css.heroSubtitle}>
          You can find everything you want in our catalog
        </p>
        <button onClick={handleClick} className={css.heroButton}>
          View Now
        </button>
      </div>
    </section>
  );
}
