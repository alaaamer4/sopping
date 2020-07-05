import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../../components/util/steAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "../types";

// loading the user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// handel login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.err;
    if (error) {
      dispatch(setAlert(error, "danger"));
    }
    dispatch({ type: LOGIN_ERROR });
  }
};
// handel registering the user
export const register = (name, email, password, password2) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, password2 });
  try {
    const res = await axios.post("/api/user", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    const error = err.response.data.err;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    if (error) {
      dispatch(setAlert(error, "danger"));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// handel Log Out
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
