import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const checkIfLoggedIn=async()=>{
      const cookie=localStorage.getItem('jwt');
      const response=await fetch(`/api/ //zv1/users/protect`,{ // Add endpoint from Backend
      method:'post',
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${cookie}`
      }
    })


  return (
    <div>
      
    </div>
  )
}
