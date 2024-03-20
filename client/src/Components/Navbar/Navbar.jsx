import React,{useEffect, useState} from "react";
import "./Navbar.css";
import logo from "./logo.ico";
import SearchBar from "./SearchBar/SearchBar";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import {gapi} from "gapi-script"
import {GoogleLogin} from "react-google-login"
import {useDispatch, useSelector} from 'react-redux'
import Auth from "../../Pages/Auth/Auth";

function Navbar({toggleDrawer,setEditCreateChanelBtn}) {
  const [AuthBtn,setAuthBtn] = useState(false)


  const CurrentUser = useSelector(state=>state.currentUserReducer)
  console.log(CurrentUser);
  //console.log(CurrentUser.data.result.email );

 useEffect(()=>{
   function start(){
 gapi.client.init({
 clientId: "560255093062-6lj8bbqpkqmbqm940qsjogdm9soahmtf.apps.googleusercontent.com",
 scope: "email"
 })
}
gapi.load("client:auth2",start);
 },
 []);
 

 

  return (
    <>
        <div className="Container_Navbar">
      <div className="Burger_Logo_Navbar">
        <div className="burger" onClick={()=> toggleDrawer()}>
          <p></p>
          <p></p>
          <p></p>
        </div>

        <Link to={'/'} className="logo_div_Navbar">
          <img src={logo} alt="" />
          <p className="logo_title_Navabr">YouTube</p>
        </Link>
      </div>
      <SearchBar />
      <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
      <div className="appsBox">
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
      </div>
      <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
      <div className="Auth_cont_Navbar">
         {CurrentUser && CurrentUser.result?  (
           <>
           <div className="Chanel_logo_App" onClick={()=>setAuthBtn(true)}>
             <p className="fstChar_logo_App">
               {
                 CurrentUser?.result.name ?(
                   <>
                   {CurrentUser?.result.name.charAt(0).toUpperCase()}
                   </>
                 ): (<>
                 {CurrentUser?.result.email.charAt(0).toUpperCase()}
                 </>)
               }
             </p>
           </div>
           </>
         ) : (
          <>
          
      <NavLink to={'/signin'} className="AuthBtn">
          <BiUserCircle  size={22} />
          <b>Sign In</b>

          </NavLink>
          </>
         )}
         </div>
    </div>
    {
        AuthBtn &&
        <Auth setAuthBtn={setAuthBtn} User={CurrentUser}
       setEditCreateChanelBtn={setEditCreateChanelBtn}
        
        />
      }
    </>

  );
}
       
export default Navbar;

{/* 
       <div className="Auth_cont_Navbar">
     {CurrentUser ? (
           <>
           <div className="Chanel_logo_App" onClick={()=>setAuthBtn(true)}>
             <p className="fstChar_logo_App">
               {
                 CurrentUser?.result.name ?(
                   <>
                   {CurrentUser?.result.name.charAt(0).toUpperCase()}
                   </
                 ): (<>
                 {CurrentUser?.result.email.charAt(0).toUpperCase()}
                 </>)
               }
             </p>
           </div>
           </>
         ) : (
           <>
           <GoogleLogin 
           clientId="560255093062-6lj8bbqpkqmbqm940qsjogdm9soahmtf.apps.googleusercontent.com"
           onSuccess={onSuccess}
           onFailure={onFailure}
           render={(renderProps)=>(
             <p onClick={renderProps.onClick} className="AuthBtn">
               <BiUserCircle  size={22} />
               <b>Sign In</b>
             </p>)
           }
           />
        
           </>
         )}
       </div> */}