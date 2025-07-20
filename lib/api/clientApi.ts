import { nextServer } from "./api";
import { Note } from "@/types/note";
import { NewNote } from "@/types/note";
import { Tag } from "@/types/note";
import { LoginRequest, RegisterRequest, UpdateUserRequest, User } from "@/types/user";
import { NotesHttpResponse } from "@/types/note";

export const fetchNotes = async(
    query?: string, 
    page: number = 1, 
    tag?: Tag | undefined
): Promise<NotesHttpResponse> => { 
    const parameters = new URLSearchParams({
        ...(query !=='' ? {search: query} : {}),
        ...(tag !== undefined  ? {tag} : {}),
        page: page.toString() ,
    })
    const response = await nextServer.get<NotesHttpResponse>(
        '/notes', {
        params: parameters,
        });
    return response.data;
};

export const createNote = async(newNote: NewNote): Promise<Note> => {
    const response = await nextServer.post<Note>(`/notes`, newNote);
    return response.data;
};

export const deleteNote = async(id: string): Promise<Note> => {
    const response = await nextServer.delete<Note>(`/notes/${id}`
    );
    return response.data;
};

export const fetchNoteById = async(id: string): Promise<Note> => {
    const response = await nextServer.get<Note>(`/notes/${id}`);
return  response.data;
};

export const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export const register = async (data: RegisterRequest) => {
    const response = await nextServer.post<User>('/auth/register', data);
    return response.data;
};

export const login = async (data: LoginRequest) => {
    const response = await nextServer.post<User>('/auth/login', data);
    return response.data;
};

type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async (): Promise<boolean> => {
        const response = await nextServer.get<CheckSessionRequest>('/auth/session');
        return Boolean(response.data.success); 
    
};


export const getMe = async (): Promise<User> => {
  const res = await nextServer.get("/users/me");
  return res.data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout')
};


export const updateMe = async (payload: UpdateUserRequest) => {
    const response = await nextServer.patch<User>('/users/me', payload);
    return response.data;
}