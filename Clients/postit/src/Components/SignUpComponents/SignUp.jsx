import { Link} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSubmit } from "react-router-dom";
import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import {
  Paper,
  Typography,
  IconButton,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import Square from "./Square";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { FaArrowCircleLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import { HowToReg } from "@mui/icons-material";
import { validate } from 'react-email-validator';
import Input from "./Input";

const PasswordRequirements = ({ password }) => {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;

  const boxStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    marginTop: "8px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <>
      <div style={boxStyle}>
        <ul>
          <li
            style={{
              color:
                password.length >= 8 && password.length <= 12 ? "green" : "red",
            }}
          >
            {password.length > 8 && password.length <= 12 ? (
              <CheckCircle />
            ) : (
              <Cancel />
            )}{" "}
            8-12 Characters
          </li>

          <li style={{ color: numberRegex.test(password) ? "green" : "red" }}>
            {numberRegex.test(password) ? <CheckCircle /> : <Cancel />} At least
            one number
          </li>

          <li
            style={{ color: uppercaseRegex.test(password) ? "green" : "red" }}
          >
            {uppercaseRegex.test(password) ? <CheckCircle /> : <Cancel />} At
            least one uppercase letter
          </li>

          <li
            style={{ color: lowercaseRegex.test(password) ? "green" : "red" }}
          >
            {lowercaseRegex.test(password) ? <CheckCircle /> : <Cancel />}{" "}
            Atleast one lowercase letter
          </li>

          <li
            style={{
              color: specialCharacterRegex.test(password) ? "green" : "red",
            }}
          >
            {specialCharacterRegex.test(password) ? (
              <CheckCircle />
            ) : (
              <Cancel />
            )}{" "}
            At least one special Character
          </li>
        </ul>
      </div>
    </>
  );
};

export default function SignUp() {
  // const navigation = useNavigation();
  const submit = useSubmit();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  useEffect(() => {
    // Update the component when password changes
  }, [signUpData.password]);

  function sendData(e, googleauth) {
    // Look more into Google auth
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 5000);

    if (googleauth) {
      submit(googleauth, { method: "post" });
      return;
    }

    e.preventdefault();
    setShowPasswordRequirements(true);

    if (!signUpData.email || !signUpData.password) {
      return toast.error("Please fill all required fields", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        draggablePercent: true,
      });
    }

    if (!validate(signUpData.email)) {
      return toast.error("please enter a Valid Email", {
        theme: "colored",
        position: "bottom-center",
        progress: true,
        autoClose: 2500,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar: false,
        draggable: true,
      });
    }

    if (signUpData.password.length > 0 && signUpData.password.length < 8) {
      return toast.error("Invalid! Password must be more than 8 Characters", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    if (signUpData.password.length > 12) {
      return toast.error("invalid! password should not exceed 12", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const uppercaseRegex = /[A-Z]/;

    if (!numberRegex.test(signUpData.password)) {
      return toast.error("Invaid! Password should have at least one digit", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    if (!specialCharacterRegex.test(signUpData.password)) {
      return toast.error("Invaid! Password should have at least one digit", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    if (!uppercaseRegex.test(signUpData.password)) {
      return toast.error("Invaid! Password should have at least one digit", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const responseMessage = (response) => {
    let token = response.credential; // Set up token response from backend
    let decoded = jwtDecode(token);
    setSignUpData({
      name: decoded.name,
      email: decoded.email,
      password: decoded.sub,
    }); // look more into Sub && JWT Decode
    sendData(1, {
      name: decoded.name,
      email: decoded.email,
      password: decoded.sub,
      isGoogle: true,
      pic: decoded.picture,
    });
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventdefault();

  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen relative overflow-hidden px-2">
        <Square></Square>
        <Square isRight={true}></Square>
        <Paper
          className="z-20 w-full max-w-[370px] p-[2rem] my-auto"
          elevation={3}
        >
          <Link to="/">
            <FaArrowCircleLeft className="text-blue-600 cursor-pointer text-2xl"></FaArrowCircleLeft>
          </Link>
          <div className="font-Poppins text-3xl font-extrabold flex items-center flex-col">
            <HowToReg fontSize="large" color="primary" />
            <Typography variant="h5">Sign Up</Typography>/
          </div>
          <br />
          <hr /> <hr />
          <form className="mt-6 relative">
            <Input
              onSetData={setSignUpData}
              name="name"
              text="Name"
              placeholder="Enter your name"
              type="text"
            ></Input>
            <Input
              onSetData={setSignUpData}
              name="email"
              text="Email ID"
              placeholder="Enter your Email Address"
              type="text"
            ></Input>
            <div className="relativ">
              <div className="relative">
                <Input
                  onSetData={setSignUpData}
                  name="password"
                  text="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                />

                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "71%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              {showPasswordRequirements && (
                <PasswordRequirements password={signUpData.password} />
              )}
            </div>

            <div className="flex flex-row justify-center mt-8">
              <Button
                sx={{ padding: ".5rem 4rem" }}
                onClick={sendData}
                variant="contained"
              >
                {!submitting && <div>SIGN UP</div>}
                {submitting && (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={25} style={{ color: "#FFFFFF" }} />
                  </Box>
                )}
              </Button>
            </div>

            <Typography className="text-center py-3">
              Already have an account?{" "}
              <Link className="text-blue-600" to="/login">
                login
              </Link>
            </Typography>

            <div className="h-[1px] w-full mt-4 bg-gray-400"></div>
            <div className="flex flex-col items-center mt-6">
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
}

//PropTypes Configuartion.
PasswordRequirements.propTypes = {
  password: PropTypes.node,
};
