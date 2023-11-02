import { FC, useEffect, useState } from "react"
import { Book } from "./Book"
import { getAllBooks } from "../api/Book";
import { useAuth } from "../security/AuthContext";
import { Role } from "../security/Role";
import BookComponent from "./BookComponent";
import { ToastContainer } from "react-toastify";
import { ToastMethod } from "../error/ToastMethod";


const BookListComponent : FC = () => {

    const authContext = useAuth();

    const [books, setBooks] = useState<Book[]>([]);

    const [isManager, setIsManager] = useState<boolean>(false);

    function refreshBooks(){
        getAllBooks()
        .then((response)=> {setBooks(response.data); })
        .catch((_) => { ToastMethod.error("Failed to get books"); });
    }

    useEffect(() => {
        setIsManager(authContext?.userDetails?.roles.includes(Role.MANAGER)??false);
        refreshBooks();
    }, [authContext, setIsManager]);

    return (
        <div className="table-container">
            <ToastContainer/>
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
                            <BookComponent book={book} isManager={isManager} refreshBooks={refreshBooks}/>
                        )
                    )}
               </tbody>
            </table>
        </div>
    )
}



export default BookListComponent;