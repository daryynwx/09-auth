import { fetchNotesServer } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }:Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] as Tag;
  return {
    title: `${tag} notes`,
    description: slug[0] === 'all'
     ? "Browse all notes available in Note Hub — your space for organized ideas, productivity boosts, and smart information capture. Discover insights across all topics." 
     : `Explore all notes tagged with "${tag}" in Note Hub — find insights, inspiration, and detailed information curated under this specific theme.`,
    openGraph: {
      title: `${tag} notes`,
      description: slug[0] === 'all' ? "All notes in Note Hub" : `All notes with tag ${tag}`,
      url: slug[0] === 'all' ? `https://08-zustand-eypfyygwr-yelyzaveta-musianovychs-projects.vercel.app/notes/filter/all`: `https://08-zustand-eypfyygwr-yelyzaveta-musianovychs-projects.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: slug[0] === 'all'
      ? "All notes collection preview in Note Hub"
      : `Notes tagged with ${tag} - Note Hub preview image`,
        },
      ],
    }
  }
}

export default async function Notes({ params }: Props) {
  const initialQuery = '';
  const initialPage = 1;
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0] as Tag;
  const notes = await fetchNotesServer(initialQuery, initialPage, tag);

  return (
      <NotesClient 
      initialQuery={initialQuery}
      initialPage={initialPage}
      initialTag={tag}
      initialNotes={notes} />
  )
}