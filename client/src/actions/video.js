import * as api from '../api';
import {io} from "socket.io-client";


export const uploadVideo= (videoData)=>async(dispatch) =>{
    try{
        const { fileData,fileOptions} = videoData;
         //console.log(fileData);
         const {data}= await api.uploadVideo(fileData,fileOptions)
         dispatch({type:'POST_VIDEO',data})
         dispatch(getAllVideo());
    } catch (error)
    {
        alert(error.response.data.message);
    }
};

export const updateVideoList = (newVideo) =>async(dispatch) =>{
    dispatch({ 
    type: 'UPDATE_VIDEO_LIST',
    payload: newVideo,
})
}

export const getAllVideo =() => async(dispatch)=>{ 

    try {
        const {data} = await api.getVideos();
        dispatch({type: 'FETCH_ALL_VIDEOS',payload:data})
    }
    catch (error){
        console.log(error);
    }
}

export const likeVideo = (LikeDate) => async(dispatch) =>{
   try {
    const {id,Like} = LikeDate;
    const {data} = await api.likeVideo(id,Like);
    dispatch({type:"POST_LIKE",payload:data});
    dispatch(getAllVideo());
   }
   catch(error){
    console.log(error)
   }
}

export const viewVideo=(ViewData) => async(dispatch)=>{
    try{
        const {id} = ViewData;
        // console.log(id)
        const {data} = await api.viewsVideo(id)
        dispatch({type: 'POST_VIEWS', data})
        dispatch(getAllVideo());
    }
    catch(error){
        console.log(error);
    }
}

export const updateViews = (videoId,views) =>({
    type: 'UPDATE_VIEWS',
    videoId,views
})

export const updateLikes = (videoId) =>({
    type: 'UPDATE_LIKES',
    payload: videoId,
})

export const deleteLikes = (videoId) =>({
    type: 'DELETE_LIKES',
    payload: videoId,
})
