import FiltersSidebar from '@/components/Catalog/FiltersSidebar';
import css from './layout.module.css';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={css.catalogSection}>
      <div className={css.catalogContainer}>
        {/* ЛІВА КОЛОНКА */}
        <aside className={css.filterSide}>
          <FiltersSidebar  />
        </aside>

        {/* ПРАВА ЧАСТИНА */}
        <main className={css.catalogMain}>
          {children}
        </main>
      </div>
    </section>
  );
}