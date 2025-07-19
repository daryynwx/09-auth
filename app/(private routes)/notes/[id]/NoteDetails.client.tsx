'use client';

import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();

    const {data: note, isLoading, error} = useQuery({
        queryKey: ['notes', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;

    return (
    <NotePreview note={note} />
    )
}