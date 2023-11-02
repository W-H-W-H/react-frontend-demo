import { FC, useEffect, useState } from "react"
import { Book } from "./Book"
import { deleteBookWithId, getAllBooks } from "../api/Book";
import { useAuth } from "../security/AuthContext";
import { Role } from "../security/Roles";
import { addBookmark } from "../api/Bookmark";


const BookListComponent : FC = () => {

    const authContext = useAuth();

    const [books, setBooks] = useState<Book[]>([]);

    const [isManager, setIsManager] = useState<boolean>(false);

    function refreshBooks(){
        getAllBooks()
        .then((response)=> {setBooks(response.data); })
        .catch((error) => console.log(error));
    }

    function handleDelete(bookId : string){
        deleteBookWithId(bookId)
        .then((response) => {
            if (response.status === 204){
                refreshBooks();
            }
        })
        .catch((error) => {

        });
    }

    function handleBookmark(bookId : string){
        addBookmark(bookId)
        .then((response)=>{
            if (response.status === 201){
                
            }
        })
        .catch((error)=>{

        })

    }

    useEffect(() => {
        setIsManager(authContext?.userDetails?.roles.includes(Role.MANAGER)??false);
        refreshBooks();
    }, [authContext, setIsManager]);

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th className={(isManager ? "w-5/12" : "w-6/12")}>Title</th>
                        <th className={(isManager ? "w-3/12" : "w-3/12")}>ISBN</th>
                        <th className={(isManager ? "w-2/12" : "w-3/12")}>Add to favourite</th>
                        {
                            isManager &&  <th className="w-2/12">Delete book</th>
                        }
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
                                    <button className="btn btn-green" type="button" onClick={() => handleBookmark(book.id)}>Bookmark</button>
                                </td>
                                {
                                    isManager &&  
                                    <td>
                                        <button className="btn btn-red" type="button" onClick={() => handleDelete(book.id)}>DELETE</button>
                                    </td>
                                }
                            </tr>
                        )
                    )}
               </tbody>
            </table>
        </div>
    )
}



export default BookListComponent;