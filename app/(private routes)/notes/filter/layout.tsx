type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

import css from "./LayoutNotes.module.css";

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <div className={css.notesWrapper}>{children}</div>
      <aside className={css.sidebar}>{sidebar}</aside>
    </section>
  );
};

export default NotesLayout;