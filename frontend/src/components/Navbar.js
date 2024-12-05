import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Navbar = ({ showLoginButton = true }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userInfo");
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="ml-3 text-xl">iBlog</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link to="/about" className="mr-5 hover:text-orange-900">
            About
          </Link>
          <Link to="/post" className="mr-5 hover:text-orange-900">
            Read Blog
          </Link>
          <Link to="/write" className="mr-5 hover:text-orange-900">
            Write Blog
          </Link>
          {/* <Link className="mr-5 hover:text-orange-900">Fourth Link</Link> */}
        </nav>
        {showLoginButton &&
          (!user ? (
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-orange-200 rounded text-base mt-4 md:mt-0"
              onClick={handleLoginClick}
            >
              Login
            </button>
          ) : (
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-orange-200 rounded text-base mt-4 md:mt-0"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          ))}
        {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-orange-200 rounded text-base mt-4 md:mt-0">
          Login
        </button> */}
      </div>
    </header>
  );
};

export default Navbar;
