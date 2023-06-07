import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Onboard from "../components/Images/Onboard.jpg";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "../pages/Login.css";
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const navigate = () => {
    window.location.href = "http://localhost:3000/home";
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
    if (email === "") {
      setCheckEmail(false);
    }
    if (password === "") {
      setCheckPassword(false);
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div style={{ height: "740px" }}>
        <div className="image-onboard">
          <img src={Onboard} style={{ width: "800px" }} />
        </div>
        <div className="login">
          <MDBCard
            alignment="center"
            style={{ width: "500px", border: "2px solid" }}
          >
            <MDBIcon
              fas
              icon="user-circle"
              className="fa-2x"
              style={{ marginTop: "20px" }}
            />
            <h5>Sign In</h5>
            <MDBCardBody>
              <MDBValidation
                onSubmit={handleSubmit}
                noValidate
                className="row g-3"
              >
                <div className="col-md-12">
                  <p style={{ marginRight: "350px" }}>
                    Email<span style={{ color: "#ED2B2A" }}>*</span>
                  </p>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="email"
                    value={email}
                    name="email"
                    onChange={onInputChange}
                    style={{ width: "400px", fontFamily: "sans-serif" }}
                    placeholder="Enter Email"
                  />

                  {checkEmail === false && (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#D21312",
                        marginLeft: "200px",
                      }}
                    >
                      Email Is Required
                    </span>
                  )}
                </div>
                <div className="col-md-12">
                  <p style={{ marginRight: "330px" }}>
                    Password<span style={{ color: "#ED2B2A" }}>*</span>
                  </p>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    name="password"
                    placeholder="Enter Password"
                    onChange={onInputChange}
                    style={{ width: "400px" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {checkPassword === false && (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#D21312",
                        marginLeft: "200px",
                      }}
                    >
                      Password Is Required
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <MDBBtn
                    style={{ width: "300px", height: "50px" }}
                    className="mt-2"
                  >
                    {loading && (
                      <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                        onClick={() => dispatch1({ type: "login" })}
                      />
                    )}
                    Login
                  </MDBBtn>
                </div>
              </MDBValidation>
              <br />
            </MDBCardBody>
          </MDBCard>
          <MDBCardFooter>
            <Link to="/register">
              <p>Don't have an account ? Sign Up</p>
            </Link>
          </MDBCardFooter>
        </div>
      </div>
    </>
  );
};

export default Login;
