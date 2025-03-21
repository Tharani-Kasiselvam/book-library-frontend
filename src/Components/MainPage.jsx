import { useNavigate } from 'react-router-dom';
import bg_video from '../assets/bg_video.mp4'
import { useEffect, useState } from 'react';
import { useBookStore } from '../store/bookStore';
const MainPage = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

    return (

<div className="text-white px-1 md-px-12 my-2 overflow-hidden" style={{position:"relative" ,height:"75vh",margin:"8px"}}>
{/* <div className="container position-absolute top-0 start-0" style={{background:"#252422",opacity:"80%",zIndex:"-10   "}}></div>  */}
<div className="top-0" style={{background:"#252422",opacity:"80%",height:"75vh", width:"100%", position:"absolute", zIndex:"-10"}}></div>
{/* ,position:"absolute",zIndex:"-10" */}
<div style={{position:"absolute",inset:"0", zIndex:"-20"}}
> 
  <video
    className="object-fit-cover"
    autoPlay
    loop
    muted
  >
    <source src={bg_video} type="video/mp4" />
  </video>
</div>
<div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center my-5">
        <h1 className="text-center mb-5">
          Share your <span className="text-danger">favorite</span> books and{" "}
          <span className="text-danger">discover</span> new ones from readers
          like you.
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-75 max-w-sm md-max-w-xl lg-max-w-3xl text-base lg-text-lg"
          style = {{position:"relative"}}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Psychology of Money"
            className="w-75 px-3 py-1.5 py-2 rounded placeholder:text-gray-600" style={{color:"#252422",background:"#FFFCF2"}}
          />
          <button
            type="submit"
            className="right-0 top-0 bottom-0 px-4 border border-white transitionfont-semibold rounded text-white" 
            style={{marginLeft:"0",position:"absolute",background:"#403D39"}}
          >
            Search
          </button>
        </form>

        </div>
</div>

    )
}
export default MainPage