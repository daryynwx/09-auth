'use client';

import css from './App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import SearchBox from '@/components/SearchBox/SearchBox'
import type { Note, Tag } from '@/types/note';
import { useState } from 'react'
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface NoteData {
  notes: Note[],
  totalPages: number,
}

type NotesClientProps = {
  initialQuery: string;
  initialPage: number;
  initialTag?: Tag;
  initialNotes: NoteData
};

export default function NotesClient({ 
  initialQuery,
  initialPage,
  initialTag,
  initialNotes }: NotesClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setPage(1);
    };
    
    const [debouncedQuery] = useDebounce(query, 300);

     const {data, isSuccess} = useQuery({
    queryKey: ['notes', debouncedQuery, page, initialTag],
    queryFn: () => fetchNotes(debouncedQuery, page, initialTag),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
  });

    return (
        <div className={css.app}>
	      <header className={css.toolbar}>
          <SearchBox query={query} updateQuery={updateQuery}/>
          {data?.totalPages && 
          data.totalPages > 1 && 
          <Pagination 
          page={page} 
          totalPages={data?.totalPages}
          onPageChange={setPage}
          />}
          <Link href="/notes/action/create" className={css.button}>Create note +</Link>
        </header>
        {isSuccess && 
        data.notes.length > 0 && 
        <NoteList notes={data.notes} />}
    </div>
    )
}