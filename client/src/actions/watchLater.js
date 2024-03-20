import * as api from '../api';

export const addTowatchLater =(watchLaterData) => async(dispatch)=>{
    try{
        const {data} = await api.addTowatchLater(watchLaterData);
        //console.log(watchLaterData);
        dispatch({ type: "POST_WATCHLATER",data})
        dispatch(getAllWatchLater());
    }
    catch(error){
        console.log(error);
    }
}

export const getAllWatchLater =()=> async(dispatch)=> {
    try {
        const {data} = await api.getAllWatchLater();
        dispatch({type: 'FETCH_ALL_WATCHLATER_VIDEOS', payload:data});
    }
    catch(error){
        console.log(error);
    }
}

export const deleteWatchLater =(watchLaterData)=> async(dispatch)=>{
    try {
        const {videoId,Viewer}=watchLaterData;
        await api.deleteWatchLater(videoId,Viewer);
        dispatch(getAllWatchLater());
    } catch (error) {
        console.log(error)
    }
  }