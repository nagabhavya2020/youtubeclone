import axios from "axios"
const API = axios.create({baseURL : `https://youtubeclone-mocha.vercel.app/`})

API.interceptors.request.use(req=>{
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    return req;
})

export const signIn = (email,password) => API.post('/user/signIn',{email,password})
export const signUp = (email,password) => API.post('/user/signUp',{email,password})

export const login=(authData)=>API.post('/user/login',authData);

export const updateChanelData=(id,updateData)=> API.patch(`user/update/${id}`,updateData)
export const fetchAllChanel = () => API.get("/user/getAllChanels");

export const uploadVideo =(fileData,fileOptions) => API.post("/video/uploadVideo",fileData,fileOptions);
export const getVideos= () => API.get("/video/getvideos");

export const likeVideo =(id,Like) => API.patch(`/video/like/${id}`,{Like});
export const addToLikedVideo = (likedVideoData) => API.post('/video/likeVideo',likedVideoData);
export const getAlllikedVideo= () => API.get('/video/getAlllikeVideo');
export const deletelikedVideo = (videoId,Viewer) => API.delete(`/video/deleteLikedVideo/${videoId}/${Viewer}`);


export const addTowatchLater = (watchLaterData) => API.post('/video/watchLater',watchLaterData);
export const  getAllWatchLater = ()=> API.get('/video/getAllWatchLater')
export const deleteWatchLater = (videoId,Viewer) => API.delete(`/video/deleteWatchLater/${videoId}/${Viewer}`);

export const addToHistory = (HistoryData) => API.post('/video/History',HistoryData);
export const getAllHistory=() => API.get('/video/getAllHistory');
export const deleteHistory=(userId) => API.delete(`/video/deleteHistory/${userId}`);

export const viewsVideo = (id) => API.patch(`/video/view/${id}`);

export const postComment=(CommentData)=>API.post('/comment/post',CommentData)
export const deleteComment=(id)=>API.delete(`/comment/delete/${id}`)
export const editComment=(id,commentBody)=>API.patch(`/comment/edit/${id}`,{commentBody})
export const getAllComment=()=>API.get('/comment/get')


export const subscribe = (Subscribedata) => API.post('/user/subscribe',Subscribedata);
export const unsubscribe =(unSubscribedata) => API.post('/user/unsubscribe',unSubscribedata);
export const subscriptionStatus = (subscriptionData) => API.post(`/user/subscriptionStatus`,subscriptionData);

