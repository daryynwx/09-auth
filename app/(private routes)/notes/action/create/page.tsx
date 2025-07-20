import css from './page.module.css'
import NoteForm from '@/components/NoteForm/NoteForm';
import { tags } from '@/lib/api/clientApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Create new note | Note Hub",
    description: "Easily create a new note with a title, content, and tag to stay organized.",
    openGraph: {
        title: "Create new note | Note Hub",
        description: "Easily create a new note with a title, content, and tag to stay organized.",
        url: "https://08-zustand-eypfyygwr-yelyzaveta-musianovychs-projects.vercel.app/notes/action/create",
        images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Create a new note in Note Hub - input form preview",
        },
      ],
    }
};

const CreateNote = () => {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm tags={tags}/>
            </div>
        </main>

    )
};

export default CreateNote;