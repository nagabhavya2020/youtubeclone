import React, { useEffect } from 'react'
import './ShowVideo.css'
import moment from 'moment';
import {Link} from "react-router-dom"


function ShowVideo({vid}) {
    //console.log(vid);
   
  return (
    <>
    <Link to={`/videopage/${vid?._id}`} >
        {/* //`http://localhost:5500/${vid.filePath}`}  */}
        <video src={`https://youtubeclone-mocha.vercel.app//${vid.filePath}`} className='video_ShowVideo'
            />
    </Link>
  
    <div className="video_description">
        <div className="Chanel_logo_App">
            <div className='fstChar_logo_App'>
                <>{vid?.Uploder?.charAt(0).toUpperCase()}</>

            </div>

        </div>
        <div className="video_details">
            <p className="title_vid_ShowVideo">{vid?.videoTitle}</p>
            <pre className='vid_view_UploadTime'> {vid?.Uploder}</pre>
            <pre className='vid_view_UploadTime'> 
            {vid?.Views} views <div className="dot"></div> {moment(vid?.createdAt).fromNow()}
            </pre>                                           
        </div>
    </div>
    </>
  )
}

export default ShowVideo
