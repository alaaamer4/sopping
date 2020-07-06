import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store/store";
import { loadUser } from "./store/actions/auth";
import "./App.css";
import Home from "./components/routes/Home";
import Login from "./components/auth/Login";
import Alert from "./components/util/Alert";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import PrivateRoute from "./components/util/PrivateRoute";
import UploadFiles from "./components/routes/UploadFiles";
import setAuthToken from "./components/util/steAuthToken";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App({ auth }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return auth.isLoading === false ? (
    <div>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <div className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/upload" component={UploadFiles} />
          </Switch>
        </div>
      </Router>
    </div>
  ) : (
    <div className="container">
      <Loader
        type="Circles"
        color="#00BFFF"
        height={200}
        width={200}
        className="text-center"
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
