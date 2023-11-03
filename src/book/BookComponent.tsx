import { FC } from "react";
import { Book } from "./Book";
import { addBookmark } from "../api/Bookmark";
import { deleteBookWithId } from "../api/Book";
import { ToastMethod } from "../error/ToastMethod";

interface IBookComponentProps {
    book: Book,
    isManager : boolean,
    refreshBooks : () => void
}

const BookComponent : FC<IBookComponentProps> = ({book, isManager, refreshBooks}) => {

    function handleBookmark(bookId : string){
        addBookmark(bookId)
        .then((response)=>{
            if (response.status === 201){
                ToastMethod.success("Bookmark added");
            }
        })
        .catch((_)=>{
            ToastMethod.error(`Failed to add bookmark`);
        })
    }

    function handleDelete(bookId : string){
        deleteBookWithId(bookId)
        .then((response) => {
            if (response.status === 204){
                ToastMethod.success("The book is deleted");
                refreshBooks();
            }
        })
        .catch((_) => {
            ToastMethod.error(`Failed to delete the book`);
        });
    }

    return (
        <tr key={book.id}>
        <td>
            {book.title}
        </td>
        <td>
            {book.isbn}
        </td>
        <td>
            <button className="btn btn-green" type="button" onClick={() => handleBookmark(book.id)}>Bookmark</button>
        </td>
        {
            isManager &&  
            <td>
                <button className="btn btn-red" type="button" onClick={() => handleDelete(book.id)}>DELETE</button>
            </td>
        }
    </tr>
    );
}



export default BookComponent;