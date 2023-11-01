import { apiClient } from "./ApiClient";

export const getAllBooks = () => apiClient.get(`/books`);

export const getBookWithId = (bookId : string) => apiClient.get(`/books/${bookId}`);

export const deleteBookWithId = (bookId : string) => apiClient.delete(`/books/${bookId}`);