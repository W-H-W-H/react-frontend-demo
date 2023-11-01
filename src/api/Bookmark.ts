import { apiClient } from "./ApiClient";

export const getAllBookmarks = () => apiClient.get("/bookmarks");

export const addBookmark = (bookId : string) => apiClient.post(`/bookmarks/${bookId}`);

export const deleteBookmark = (bookId : string) => apiClient.delete(`/bookmarks/${bookId}`);