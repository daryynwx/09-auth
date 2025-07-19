'use client'

import Link from 'next/link';
import css from './TagsMenu.module.css';
import { tags } from '@/lib/api/clientApi';
import { useState } from 'react';

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={css.menuContainer}>
  <button className={css.menuButton} onClick={toggle}>
    Notes ▾
  </button>
    {isOpen && (<ul className={css.menuList}>
        <li className={css.menuItem}>
            <Link onClick={toggle} href={`/notes/filter/all`} className={css.menuLink}>
            All notes
            </Link>
        </li>
    {tags.map((tag) => (
      <li className={css.menuItem} key={tag}>
        <Link onClick={toggle} href={`/notes/filter/${tag}`} className={css.menuLink}>
          {tag}
        </Link>
      </li>
    ))}
    </ul>
)}
</div>
    )
};

export default TagsMenu;