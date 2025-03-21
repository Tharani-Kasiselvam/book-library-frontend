import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useBookStore } from "../store/bookStore";

const AddBook = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [review, setReview] = useState("");
  const { isLoading, error, addBook } = useBookStore();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !title || !author || !link) {
      toast.error("Please fill in required information.");
      return;
    }

    const { message } = await addBook(
      image,
      title,
      subtitle,
      author,
      link,
      review,
    );

    toast.success(message);
    navigate("/");
  };
  return (
    <div className="d-flex flex-column text-dark fw-bold bg-body-tertiary px-4 md-px-12 pb-16 justify-content-center">
      <h2 className="text-center fw-semibold pt-8 text-xl md-text-2xl w-100 max-w-xl mx-auto mt-5">
        Add Book to Library
      </h2>

      
      <form
        onSubmit={handleSubmit}
        // className="w-100 d-flex flex-column justify-content-center align-items-center gap-2 mt-5 md-mt-10"
        className="w-50 d-flex flex-column mx-auto justify-content-center align-items-center gap-2 mt-5 md-mt-10"

      >

        <div className="d-flex flex-column w-100"> 
          <label className="md-text-lg">Book Image*:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-100 px-0.5 py-1.5 md-py-2 text-dark rounded bg-white border border-dark-subtle"
          />
        </div>

        <div className="d-flex flex-column w-100">
          <label className="md-text-lg">Title*:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the book title"
            className="w-100 px-3 py-1.5 md-py-2 text-dark rounded bg-white border border-dark-subtle"
          />
        </div>
        <div className="d-flex flex-column w-100">
          <label className="md-text-lg">Subtitle (optional):</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter the book subtitle"
            className="w-100 px-3 py-1.5 md-py-2 text-dark rounded-lg bg-white border border-dark-subtle"
          />
        </div>
        <div className="d-flex flex-column w-100">
          <label className="md-text-lg">Author*:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author's name"
            className="w-100 px-3 py-1.5 md-py-2 text-dark rounded bg-white border border-dark-subtle"
          />
        </div>
        <div className="d-flex flex-column w-100">
          <label className="md-text-lg">Link*:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link to where users can find the book"
            className="w-100 px-3 py-1.5 md-py-2 text-dark rounded bg-white border border-dark-subtle"
          />
        </div>
        <div className="d-flex flex-column w-100">
          <label className="md-text-lg">Personal Review (optional):</label>
          <textarea
            rows={4}
            value={review}
            placeholder="Your personal review"
            onChange={(e) => setReview(e.target.value)}
            className="w-100 px-3 py-1.5 resize-none md-py-2 text-dark rounded bg-white border border-dark-subtle"
          />
        </div>
        {error && <p className="text-danger fw-bold">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-100 bg-dark text-white py-2 fw-normal rounded"
        >
          {isLoading ? "Please wait..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;