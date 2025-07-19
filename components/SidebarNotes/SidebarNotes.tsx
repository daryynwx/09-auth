import css from './SideBarNotes.module.css'
import Link from 'next/link';
import { tags } from '@/lib/api/clientApi';

const SideBarNotes = () => {
    return (
          <ul className={css.menuList}>
            <li className={css.menuItem}>
              <Link href="/notes/action/create" className={css.menuLink}>
              Create note
              </Link>
            </li>
            <li className={css.menuItem}>
            <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
            </Link>
        </li>
      {tags.map((tag) => (<li className={css.menuItem} key={tag}>
        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
          {tag}
        </Link>
      </li>
    ))}
    </ul>
    )
};

export default SideBarNotes