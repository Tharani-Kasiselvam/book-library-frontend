import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useBookStore } from "../store/bookStore";

const Searchpage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchBooks, books } = useBookStore();
  const navigate = useNavigate();

  console.log("Inside SearchPage")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    await searchBooks(searchQuery);
    navigate(`/search?${searchQuery}`);
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      const searchQuery = urlParams.toString();
      searchBooks(searchQuery);
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchBooks]);

  console.log("Results: ", books);
  return (
    <div className="px-4 md-px-12 pb-10" style={{ color: "#252422", background: "#f5f5f5" }}>
      <p className="py-3" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        &larr; Back
      </p>
      <div className="w-100 h-100 d-flex flex-column justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-75 max-w-sm md-max-w-xl lg-max-w-3xl text-base lg-text-lg"
          style={{ position: "relative" }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Psychology of Money"
            className="w-75 px-3 py-1.5 py-2 rounded placeholder:text-gray-600" style={{ color: "#252422", background: "#FFFCF2" }}
          />
          <button
            type="submit"
            className="right-0 top-0 bottom-0 px-4 border border-white transitionfont-semibold rounded text-white"
            style={{ marginLeft: "0", position: "absolute", background: "#403D39" }}
          >
            Search
          </button>
        </form>
      </div>

      <h1 className="fw-semibold pt-8 pb-6 text-xl md-text-2xl ">
        Search results
      </h1>

      {books.length > 0 ? (
        <div className="d-flex flex-row flex-wrap justify-content-around gap-x-2 gap-y-5 w-75 mx-auto">
          {books.map((book, index) => (
            <Link className="text-decoration-none text-dark" key={index} to={`/book/${book._id}`}>
              {/* <Link className="text-decoration-none text-dark" key={index} to={`/book/123`}> */}

              <div className="cursor-pointer shadow-sm rounded my-2" style={{ minWidth: "9rem" }}>
                <div className="rounded" style={{ background: "#252422", height: "12rem", minWidth: "9rem" }}>
                  <img
                    src={book.image}
                    alt="book_img"
                    className="object-fit-fill object-fit-center"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                <div className="p-2 d-flex flex-column">
                  <h2 className="d-flex flex-1 mb-2 font-semibold text-base md-text-lg">
                    {book.title}
                  </h2>
                  <p className="text-sm md-text-base">{book.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No book found.</p>
      )}
    </div>
  );
};

export default Searchpage;