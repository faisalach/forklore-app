import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#252730] p-5 text-md font-bold">
      <nav className="flex items-center justify-center gap-x-5 ">
        <Link to="/" className="hover:text-red-500 transition-all duration-300">
          Audio Compression
        </Link>
        <Link to="/image" className="hover:text-red-500 transition-all duration-300">
          Image Compression
        </Link>
        <Link to="/video" className="hover:text-red-500 transition-all duration-300">
          Video Compression
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
