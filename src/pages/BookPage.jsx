import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useBookStore } from "../store/bookStore";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Bookpage = () => {
  const { user } = useAuthStore();
  const { fetchBookById, book, isLoading, deleteBook } = useBookStore();
  const navigate = useNavigate("/");
  const params = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBookById(params.id);
  }, [fetchBookById, params]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log("Book: ", book);

  const handleDelete = async () => {
    const { message } = await deleteBook(params.id);
    toast.success(message);
    navigate("/");
  };
  return (
    <div className="px-4 px-md-12 pb-10" style={{color:"#252422",background:"#f5f5f5"}}>
      <p className="py-3" onClick={() => navigate("/")} style={{cursor:"pointer"}}>
        &larr; Back
      </p>

      <div className="d-flex flex-column flex-md-row">
        <div className="w-100 mr-md-6 mx-auto" style={{flexBasis:"30%"}}>
          <img
            src={book?.image}
            alt="book_img"
            className="mx-auto"
                  style={{maxHeight:"50vh", width:"100%"}}
          />
          <Link to={book?.link} target="_blank" className="text-decoration-none">
            <div className="d-flex justify-content-center align-items-center" style={{width:"68vh"}}>
              <button className="px-3 py-2 w-100 mw-md-52 mt-3 fw-bold" style={{color:"#CCC5B9",background:"#403D39",width:"41vh"}}>
                Read Summary
              </button>
            </div>
          </Link>
        </div>

        <div className="mt-md-0 mw-md-4xl" style={{flexBasis:"65%", marginLeft:"20px", marginTop:"20px"}}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <p>
              Uploaded by:{" "}
              <span className="text-danger">@{book?.user.username}</span>
            </p>

            {user?._id === book?.user?._id && (
              <div className="text-2xl fw-bold mt-2" style={{position:"relative", marginLeft:"-10px"}}>
                <span
                  onClick={() => setOpen(!open)}
                  // className="tracking-widest"  
                  style={{cursor:"pointer", letterSpacing:"1px", marginLeft:"-100px"}}
                >
                  ...
                </span>

                {open && (
                  <div className="shadow-md text-base fs-normal" 
                      style={{position:"absolute",background:"#f5f5f5", marginLeft:"-150px"}}>
                    <Link to={`/book/${book._id}/update`} className="text-decoration-none">
                      <p className="mb-2 pb-2 border-bottom border-secondary text-black">
                        Update
                      </p>
                    </Link>
                    <p onClick={handleDelete} className="text-danger" style={{cursor:"pointer"}}>Delete</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <h1 className="text-4xl text-md-5xl text-lg-6xl fw-semibold">
            {book?.title}
          </h1>
          {book?.subtitle && <h3>{book?.subtitle}</h3>}
          <p className="pl-5">Written by: {book?.author}</p>

          <p className="mt-2 fw-semibold text-lg text-md-xl">Review:</p>
          <p className="text-md-lg">{book?.review}</p>
        </div>
      </div>
    </div>
  );
};

export default Bookpage;