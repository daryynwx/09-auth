import { cookies } from "next/headers";
import { nextServer } from './api';
import { User } from "@/types/user";
import { NotesHttpResponse } from "@/types/note";
import { Tag, Note } from "@/types/note";

export const fetchNotesServer = async (
    query?: string, 
    page: number = 1, 
    tag?: Tag | undefined
): Promise<NotesHttpResponse> => {
    const parameters = new URLSearchParams({
        ...(query !=='' ? {search: query} : {}),
        ...(tag !== undefined  ? {tag} : {}),
        page: page.toString() ,
    });

    const cookieStore = await cookies();
    const response = await nextServer.get('/notes', {
        params: parameters,
        headers: { 
            Cookie: cookieStore.toString(),
        },
    });
    return response.data;
};

export const fetchNoteByIdServer = async(id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const response = await nextServer.get<Note>(`/note/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return response.data;
}

export const checkServerSession = async () => {
    const cookieStore = await cookies();
    const response = await nextServer.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return response;
};

export const getServerMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get('/users/me', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
}

