import React from "react";
import "./Home.css";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid";
import { useSelector } from "react-redux";


function Home() {
  
  const allVids =useSelector(state=> state.videoReducer)?.data?.filter(q=>q).reverse();
  console.log(allVids);

  const originalVideos = allVids?.filter((video) => !video.convertedFiles);

  const NavList = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy",
    "Blogging",
    "Drama",
    "Serials",


   
  ];
  
  return (
    <div className="container_Pages_App">
      <LeftSideBar />
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {NavList.map((m) => {
            return (
              <p key={m} className="btn_nav_home">
                {m}
              </p>
            );
          })}
        </div>


            <ShowVideoGrid vids={originalVideos} />
         
      </div>
    </div>
  );
}
export default Home;
