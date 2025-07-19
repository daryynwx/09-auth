'use client'; 

import css from './NoteForm.module.css'
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { NewNote, Tag } from '@/types/note';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

interface NoteFormProps {
  tags: Tag[];
}

export default function NoteForm({tags}: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleCancel = () => router.push('/notes/filter/all');

  const { mutate }= useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    }
  });

    const handleSubmit = (formData: FormData) => { 
      const values = Object.fromEntries(formData) as NewNote;
      mutate(values);
    };

    return(<form
    action={handleSubmit}
    className={css.form}>
    <label 
    className={css.formGroup}>
      Title
      <input 
      className={css.input} 
      type="text" 
      name="title" 
      defaultValue={draft?.title} 
      onChange={handleChange} />
    </label>

  <label
  className={css.formGroup}>
    Content
    <textarea 
    className={css.textarea} 
    name="content" 
    defaultValue={draft?.content} 
    onChange={handleChange}>
    </textarea>
  </label>
    
  <label
  className={css.formGroup}>
    Tag
    <select 
    className={css.select} 
    name="tag" 
    defaultValue={draft?.tag} 
    onChange={handleChange}>
      {tags.map((tag) => (
        <option value={tag} key={tag}>
          {tag}
        </option>
      ))}
    </select>
  </label>

  <div className={css.actions}>
    <button 
    type="button" 
    className={css.cancelButton}
    onClick={handleCancel}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
    >
      Create note
    </button>
  </div>
</form>
)
}