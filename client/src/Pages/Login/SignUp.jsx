import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {signUp, signup} from '../../actions/auth.js'
import "./signUp.css";

function SignUp() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [conformpassword,setConfromPassword] = useState("");

    const dispatch =  useDispatch();
    const navigate = useNavigate()
    const register =()=>{
      
      if(password===conformpassword){
        dispatch(signup(email,password,navigate))
      }else if(password.length <=6)
      {
          alert("Password must be of length 6");
  
      }
      else{
        alert("Password does not match");
      }
    }
  return (
    <>
    <div className="SinUpContainer">

    <div className='SignUp'>
        <h1 style={{color:"white"}}>SignUp Page</h1>
      
        <div className="inputcontainer">
        <label>Email</label>
        <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="inputcontainer">
        <label>Password</label>
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="inputcontainer">
        <label>Conform Password</label>
        <input type="password" placeholder='RetypePassword' onChange={(e) => setConfromPassword(e.target.value)} />
        </div>

          <button className='btn' onClick={register}>SignUp</button>
          

            <br />
            <p style={{color:"white"}}>Or</p>
            {/* <button className='btn'><i class="fa-brands fa-goole"></i>SignUp with Google</button> */}
            <Link to="/signin">Login Page</Link>
            
    </div>
    </div>
    </>
    )
}

export default SignUp