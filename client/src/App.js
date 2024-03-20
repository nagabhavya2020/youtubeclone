import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import {BrowserRouter} from "react-router-dom";
import AllRoutes from './Components/AllRoutes';
import DrawerSidebar from './Components/LeftSideBar/DrawerSidebar';
import { useState } from 'react';
import CreateEditChanel from './Pages/Chanel/CreateEditChanel';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllChanel } from './actions/chanelUser';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import { getAllVideo } from './actions/video';
import { getAlllikedVideo } from './actions/likeVideo';
import { getAllWatchLater } from './actions/watchLater';
import { getAllHistory } from './actions/history';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllChanel());
    dispatch(getAllVideo());
    dispatch(getAlllikedVideo());
    dispatch(getAllWatchLater());
    dispatch(getAllHistory());
  },[dispatch])
  
  const[toggleDrawerSidebar, setToggleDrawerSidebar] =useState({
    display:"none",

  })
  const toggleDrawer = () =>{
    if(toggleDrawerSidebar.display==="none"){
      setToggleDrawerSidebar({
        display:"flex"
      })
    }
    else{
      setToggleDrawerSidebar({
        display:"none"
      })
    }
  }
  const [EditCreateChanelBtn,setEditCreateChanelBtn ] = useState(false)

  const [vidUploadPage,setVidUploadPage] = useState(false);

  return (
    <BrowserRouter>
    {vidUploadPage &&
    <VideoUpload setVidUploadPage={setVidUploadPage}/>
    }
    {EditCreateChanelBtn && (
    <CreateEditChanel setEditCreateChanelBtn={setEditCreateChanelBtn} />)
    }
       <Navbar
    toggleDrawer={toggleDrawer}
    setEditCreateChanelBtn={setEditCreateChanelBtn}/>
    
      <DrawerSidebar toogleDrawer={toggleDrawer} toggleDrawerSidebar={toggleDrawerSidebar} />
    
    <AllRoutes setVidUploadPage={setVidUploadPage} setEditCreateChanelBtn={setEditCreateChanelBtn}/>
  
    </BrowserRouter>
  );
}

export default App;
