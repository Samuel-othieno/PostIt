/* eslint-disable react/prop-types */
import { Link, useNavigation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useSubmit } from 'react-router-dom';
import { CheckCircle } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import {Button, Paper, } from "@mui/material";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate } from 'email-validator'; // check package for accuuracy

const PasswordRequirements = ({ password }) => {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;


  const boxStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '8px',
    backgroundColor: '#f9f9f9'
  };

  return (
    <>
      <div style={boxStyle}>
        <ul>
          <li style={{color: password.length >= 8 && password.length <= 12 ? 'green' : 'red'}}>
            {password.length > 8 && password.length <=12 ? <CheckCircle/> : <Cancel/>} 8-12 Characters
          </li>
          
          <li style={{color: numberRegex.test(password)? 'green' : 'red'}}>
            {numberRegex.test(password)? <CheckCircle/> : <Cancel/>} At least one number
          </li>

          <li style={{color: uppercaseRegex.test(password)? 'green' : 'red'}}>
            {uppercaseRegex.test(password)? <CheckCircle/> : <Cancel/>} At least one uppercase letter
          </li>

          <li style={{color: lowercaseRegex.test(password)? 'green' : 'red'}}>
            {lowercaseRegex.test(password)? <CheckCircle/> : <Cancel/>} Atleast one lowercase letter
          </li>

          <li style={{color: specialCharacterRegex.test(password)? 'green' : 'red'}}>
            {specialCharacterRegex.test(password)? <CheckCircle/>:<Cancel/>} At least one special Character
          </li>
        </ul>
      </div>
    </>
  );
};


export default function Register() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [signUpData, setSignUpData] = useState({name: '', email: '', password: ''});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);


  useEffect(()=> {
 // Update the component when password changes
  }, [signUpData.password]);

  function sendData(e, googleauth){
    setSubmitting(true);
    setTimeout(()=>{
      setSubmitting(false);
    }, 5000);

    if (googleauth){
      submit(googleauth, {method: 'post'});
      return;
    }

    e.preventdefault();
    setShowPasswordRequirements(true); 


    if (!signUpData.email || !signUpData.password) {
      return toast.error('Please fill all required fields', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        draggablePercent: true,
      });
    }

    if (!validate(signUpData.email)){
      return toast.error("please enter a Valid Email", {
        theme: 'colored',
        position: 'bottom-center',
        progress: true,
        autoClose: 2500,
        closeOnClick: true,
        closeButton: true,
        hideProgressBar:false,
        draggable: true,
      });
    }

    if(signUpData.password.length > 0 && signUpData.password.length < 8) {
      return toast.error('Invalid! Password must be more than 8 Characters',  {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }

    if (signUpData.password.length > 12) {
      return toast.error('invalid! password should not exceed 12',  {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const uppercaseRegex = /[A-Z]/;

    if(!numberRegex.test(signUpData.password)){
      return toast.error('Invaid! Password should have at least one digit', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    }

    if(!specialCharacterRegex.test(signUpData.password)){
      return toast.error('Invaid! Password should have at least one digit', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    }

    if(!uppercaseRegex.test(signUpData.password)){
      return toast.error('Invaid! Password should have at least one digit', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    }
  }

  const responseMessage = (response) =>{
    let token = response.credential;   //Should use the credentials from Server
    let decoded = jwtDecode(token);
    setSignUpData({name: decoded.name, email: decoded.email, password: decoded.sub})
  }
  
  return (
    <div>
      
    </div>
  )
}
