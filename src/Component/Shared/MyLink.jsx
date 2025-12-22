import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-orange-500 font-semibold text-lg" : `${className} font-semibold text-lg`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;