import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cyan-900 h-16 w-full flex items-center px-8">
      {/* Logo / Title */}
      <div className="flex-1">
        <NavLink to="/">
          <h1 className="text-2xl text-white font-bold">Shopping Cart</h1>
        </NavLink>
      </div>
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/products"
            className="text-white hover:text-blue-100"
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className="text-white hover:text-blue-100"
          >
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className="text-white hover:text-blue-100"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className="text-white hover:text-blue-100"
          >
            Login
          </NavLink>
        </li>
      </ul>

      {/* Navigation Links */}
    </nav>
  );
};

export default Navbar;
