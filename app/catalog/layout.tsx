"use client";
import FiltersSidebar from "@/components/Catalog/FilterSideBar/FiltersSidebar";
import css from "./layout.module.css";
import { usePathname } from "next/navigation";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSide = pathname === "/catalog";
  return (
    <section className={css.catalogSection}>
      <div className={css.catalogContainer}>
        {showSide && (
          <aside className={css.filterSide}>
            <FiltersSidebar />
          </aside>
        )}

        <main className={css.catalogMain}>{children}</main>
      </div>
    </section>
  );
}
