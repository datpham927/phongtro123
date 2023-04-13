import { Link } from "react-router-dom";

function ButtonComponent({ text, className, link, onClick }) {
  return (
    <Link
      to={link}
      className={`flex py-2 px-3 text-base justify-center rounded-md hover:underline ${className}`}
      onClick={onClick}
    >
      {text}
    </Link>

    
  );
}

export default ButtonComponent;
