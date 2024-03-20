import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {io} from "socket.io-client";
import { updateVideoList, updateViews } from "../../actions/video";
import { updateLikes,deleteLikes } from "../../actions/video";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const  SocketContextProvider = ({children }) => {
    const [socket,setSocket] = useState();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const socket = io("http://localhost:5500")
        socket.on('newVideo',(newVideo)=>{
            dispatch(updateVideoList(newVideo));
            console.log("newVideo:",newVideo);
        })
        
        socket.on('updateLikes', (videoId) => {
            dispatch(updateLikes(videoId));
            console.log("like",videoId);

          });
          
          socket.on('updateDeleteLikes', (videoId) => {
            dispatch(deleteLikes(videoId));
            console.log("delete",videoId);
          });

           
          socket.on('updateViews', ({videoId,views}) => {
            dispatch(updateViews(videoId,views));
          });

          socket.on('newComment', (newComment) => {
            dispatch({ type: "UPDATE_COMMENTS",payload:newComment });
          });

          socket.on('deleteComment',(commentId)=>{
            dispatch({type:"DELETE_COMMENT",payload:commentId});
          })

          socket.on('editComment',(updateComment)=>{
            dispatch({type:"EDIT_COMMENT",payload:updateComment})
          })

         
        setSocket(socket);

        return ()=> socket.close();
    },[]);

    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
}