import { FC, useEffect, useState } from "react";
import { Book } from "../book/Book";
import { deleteBookmark, getAllBookmarks } from "../api/Bookmark";
import { ToastMethod } from "../error/ToastMethod";
import { ToastContainer } from "react-toastify";

const BookmarkListComponent : FC = () => {

    const [books, setBooks] = useState<Book[]>([]);

    function refreshBooks(){
        getAllBookmarks()
        .then((response)=> {setBooks(response.data); })
        .catch((_) => {ToastMethod.error(`Failed to fetch data`);});
    }

    useEffect(() => {
        refreshBooks();
    }, []);

    function handleDelete(bookId : string){
        deleteBookmark(bookId)
        .then((response)=>{
            if(response.status === 200){
                refreshBooks();
                ToastMethod.success("Bookmark deleted");
            }
        })
        .catch((_)=>{
            ToastMethod.error("Failed to delete bookmark");
        });
    }

    return (
        <div className="table-container">
            <ToastContainer/>
            <table className="table">
                <thead>
                    <tr>
                        <th className="w-6/12">Title</th>
                        <th className="w-3/12">ISBN</th>
                        <th className="w-3/12">Removed from my favourite</th>
                    </tr>
                </thead>
                
               <tbody>
                    {books.map(
                        book => (
                            <tr key={book.id}>
                                <td>
                                    {book.title}
                                </td>
                                <td>
                                    {book.isbn}
                                </td>
                                <td>
                                    <button className="btn btn-red" onClick={() => handleDelete(book.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    )}
               </tbody>
            </table>
        </div>
    )
};

export default BookmarkListComponent;