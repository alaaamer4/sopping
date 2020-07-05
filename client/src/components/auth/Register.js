import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/auth";
const Register = ({ register, isAuthenticated }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = input;
  const handelChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, password2);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <section>
      <h1 className="large text-primary">Register</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create New Account
      </p>
      <form className="form" onSubmit={handelSubmit}>
        <div className="form-group">
          <input
            type="text"
            required
            value={name}
            name="name"
            placeholder="Username"
            onChange={handelChange}
            autoComplete="off"
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            required
            value={password2}
            name="password2"
            placeholder="Confirm Your Password"
            onChange={handelChange}
            autoComplete="off"
          />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};
const mapActionsToProps = {
  register,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, mapActionsToProps)(Register);
