import React from 'react'
import Home from '../Pages/Home/Home'
import {BrowserRoute,
    Route,
    Routes,
    Link
    } from "react-router-dom";
import Library from '../Pages/Library/Library';
import History from '../Pages/History/WatchHistory'
import WatchHistory from '../Pages/History/WatchHistory';
import YourVideo from '../Pages/YourVideo/YourVideo'
import WatchLater from '../Pages/WatchLater/WatchLater'
import LikedVideo from '../Pages/LikedVideo/LikedVideo'
import VideoPage from '../Pages/VideoPage/VideoPage';
import Chanel from '../Pages/Chanel/Chanel';
import Search from '../Pages/Search/Search';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Login/SignUp';


function AllRoutes({setEditCreateChanelBtn,setVidUploadPage}) {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/library' element={<Library/>}/>
        <Route path='/history' element={<WatchHistory/>}/>
        <Route path='/watchlater' element={<WatchLater/>}/>
        <Route path='/yourvideo' element={<YourVideo/>}/>
        <Route path='/likedvideo' element={<LikedVideo/>}/>
        <Route path='/videopage/:vid' element={<VideoPage/>}/>
        <Route path='/search/:searchQuery' element={<Search/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>

        <Route path='/chanel/:Cid'
         element={<Chanel 
        setVidUploadPage={setVidUploadPage}
        setEditCreateChanelBtn={setEditCreateChanelBtn}/>}/>

    </Routes>
  )
}

export default AllRoutes