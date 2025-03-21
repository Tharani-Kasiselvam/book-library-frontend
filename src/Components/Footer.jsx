import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="px-2 md-px-12 md-text-lg py-2" style={{color:"#252422", background:"#f5f5f5"}}>
      <h6 className="border-t pt-4 pb-6 italic" style={{color:"#252422", border:"#f5f5f5"}}>
        Designed and developed by{" "}
        <Link to={"https://tharani-kasiselvam-portfolio.netlify.app/"} target="_blank" className="text-decoration-none text-danger">
          Tharani.
        </Link>
      </h6>
    </div>
  );
};

export default Footer;