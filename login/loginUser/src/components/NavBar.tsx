import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div style={{ position: "fixed", top: 5, right: 10 }}>
        <nav>
          <Link to="/">Home ◾ </Link>
          <Link to="/About">About ◾ </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
