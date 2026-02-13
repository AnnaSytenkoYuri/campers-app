import css from './CampersLayout.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const CampersLayout = ({ children, sidebar }: NotesLayoutProps) => {
  return (
    <section className={css.layout}>
      <div className="container">
        <div className={css.layoutContainer}>
          <aside className={css.sidebar}>{sidebar}</aside>
          <div className={css.campersContainer}>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default CampersLayout;