import { useEffect } from "react";
import { Link } from "react-router";
import { useBookStore } from "../store/bookStore";

const BookList = () => {
  const { books, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="px-4 md-px-12 pb-20" style={{color:"#252422", background:"#f5f5f5"}}>
      <h1 className="w-100 py-6 mx-auto">
        Reader&rsquo;s favorites
      </h1>

      <div className="d-flex flex-row flex-wrap justify-content-around gap-x-2 gap-y-5 w-75 mx-auto">
        {books.map((book, index) => (
          <Link className="text-decoration-none text-dark" key={index} to={`/book/${book._id}`}>
                      {/* <Link className="text-decoration-none text-dark" key={index} to={`/book/123`}> */}

            <div className="cursor-pointer shadow-sm rounded my-2" style={{width:"15rem", height:"20rem"}}>
              <div className="rounded" style={{background:"#252422", height:"12rem", minWidth:"15rem"}}>
                <img
                  src={book.image}
                  alt="book_img"
                  className="object-fit-fill object-fit-center"
                  style={{width:"100%", height:"100%"}}
                />
              </div>

              <div className="p-2 d-flex flex-column" style={{width:"15rem", height:"10rem"}}>
                <h3 className="d-flex flex-1 md-text-base mb-2 font-semibold text-base md-text-lg" style={{fontSize:"1.3vw"}}>
                  {book.title}
                </h3>
                <p className="text-sm md-text-base" style={{fontSize:"1vw"}}>{book.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;