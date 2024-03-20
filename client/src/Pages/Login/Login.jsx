import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { Link, useNavigate } from 'react-router-dom';
import {login, signin} from '../../actions/auth.js'
import "./login.css";

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submit=()=>{
      // console.log(email,password);
      
        dispatch(signin(email,password,navigate))
      

    }
    const onSuccess = (response)=>{
      const Email= response?.profileObj.email;
      console.log(Email);
      dispatch(login({email:Email}))
    }
  
    const onFailure=(response)=>{
      console.log("Failed",response);
    }
 

  return (
    <>
    <div className="loginContainer">

    <div className='login'>
        <h1 style={{color:"white"}}>Login Page</h1>
        <div className="inputcontainer">
        <label>Email</label>
        <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="inputcontainer">
        <label>Password</label>
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
      
          <button className='btn' onClick={submit}>Login</button>
          

            <br />
            <p style={{color:"white"}}>Or</p>
             <GoogleLogin 
          clientId="560255093062-6lj8bbqpkqmbqm940qsjogdm9soahmtf.apps.googleusercontent.com"
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={(renderProps)=>(
            <button onClick={renderProps.onClick} className="btn">
              {/* <BiUserCircle  size={22} /> */}
              Login with Google
            </button>)
          }
          />
            
            {/* <button className='btn'><i class="fa-brands fa-goole"></i>Login with Google</button> */}
            <Link to="/signUp">SignUp Page</Link>
            
    </div>
    </div>
   
    </>
    )
}

export default Login

