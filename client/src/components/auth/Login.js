import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/actions/auth";
const Login = ({ login, isAuthenticated }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;
  const handelChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <section>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={handelSubmit}>
        <div className="form-group">
          <input
            type="email"
            required
            value={email}
            name="email"
            placeholder="Email Address"
            onChange={handelChange}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            required
            value={password}
            name="password"
            placeholder="Enter Your Password"
            onChange={handelChange}
            autoComplete="off"
          />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapActionsToProps = {
  login,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
