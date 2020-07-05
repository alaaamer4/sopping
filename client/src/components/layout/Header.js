import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/auth";
const Navbar = ({ isAuthenticated, logout }) => {
  const primary = (
    <h1>
      <Link to="/">
        <i className="fas fa-shopping-cart"></i> Alaa Shop
      </Link>
    </h1>
  );

  return !isAuthenticated ? (
    <nav className="navbar bg-light">
      {primary}
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="navbar bg-light">
      {primary}
      <ul>
        <li>
          <Link to="/upload">
            <i className="fas fa-upload"></i>
            {"  "}
            Upload
          </Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
            {"  "}
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapActionsToProps = {
  logout,
};
export default connect(mapStateToProps, mapActionsToProps)(Navbar);
