import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import "./LikeWatchLaterSaveBtn.css";
import { MdPlaylistAddCheck } from "react-icons/md";
import {
  RiHeartAddFill,
  RiPlayListAddFill,
  RiShareForwardLine,
} from "react-icons/ri";
import { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { likeVideo,} from "../../actions/video";
import { addToLikedVideo, deletelikedVideo } from "../../actions/likeVideo";
import { addTowatchLater, deleteWatchLater } from "../../actions/watchLater";
import { useSocketContext } from "../Auth/Socket";

function LikeWatchLaterSaveBtn({ vv, vid, isSubscribed }) {
  const [SaveVideo, setSaveVideo] = useState(false);
  const [DislikeBtn, setDislikeBtn] = useState(false);
  const [LikeBtn, setLikeBtn] = useState(false);

  const likedVideoList = useSelector((state) => state.likedVideoReducer);

  const watchLaterList = useSelector((state) => state.watchLaterReducer);

  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const dispatch = useDispatch();
  const {socket} = useSocketContext();
  useEffect(() => {
    likedVideoList?.data
      .filter(
        (q) => q?.videoId === vid && q?.Viewer === CurrentUser?.result._id
      )
      .map((m) => setLikeBtn(true));
    watchLaterList?.data
      .filter(
        (q) => q?.videoId === vid && q?.Viewer === CurrentUser?.result._id
      )
      .map((m) => setSaveVideo(true));
  }, []);

  const toggleSavedVideo = () => {
    if (CurrentUser) {
      if (isSubscribed) {
        if (SaveVideo) {
          setSaveVideo(false);
          dispatch(
            deleteWatchLater({
              videoId: vid,
              Viewer: CurrentUser?.result._id,
            })
          );
        } else {
          setSaveVideo(true);
          dispatch(
            addTowatchLater({
              videoId: vid,
              Viewer: CurrentUser?.result._id,
            })
          );
        }
      }
      else {
        alert("To Save You Need to Subscribe");
      }
    } else {
      alert("Please Login to Save the video");
    }
  };

  const toggleLikeBtn = (e, lk) => {
    if (CurrentUser) {
      if (isSubscribed) {
        if (LikeBtn) {
          setLikeBtn(false);
          dispatch(
            likeVideo({
              id: vid,
              Like: lk - 1,
            })
          );
          dispatch(
            deletelikedVideo({
              videoId: vid,
              Viewer: CurrentUser?.result._id,
            })
          );
          socket.emit('updateDeleteLikes', vid);
        } else {
          setLikeBtn(true);
          dispatch(
            likeVideo({
              id: vid,
              Like: lk + 1,
            })
          );
          dispatch(
            addToLikedVideo({
              videoId: vid,
              Viewer: CurrentUser?.result._id,
            })
          );
          socket.emit('updateLikes', vid);
          setDislikeBtn(false);
        }
      } else {
        alert("To Like You Need to Subscribe");
      }
    } else {
      alert("Please Login to give a Like");
    }
  };

  const togglesDislikeBtn = (e, lk) => {
    if (CurrentUser) {
      if (isSubscribed) {
        if (DislikeBtn) {
          setDislikeBtn(false);
        } else {
          setDislikeBtn(true);
          if (LikeBtn) {
            dispatch(
              likeVideo({
                id: vid,
                Like: lk - 1,
              })
            );
            dispatch(
              deletelikedVideo({
                videoId: vid,
                Viewer: CurrentUser?.result._id,
              })
            );
          }
          socket.emit('updateDeleteLikes', vid);

          setLikeBtn(false);
        }
      }
      else {
        alert("To DisLike You Need to Subscribe");
      }
    } else {
      alert("Please Login to give a Dislike");
    }
  };

  return (
    <div className="btns_cont_videoPage">
      <div className="btn_VideoPage">
        <BsThreeDots />
      </div>

      <div className="btn_VideoPage">
        <div
          className="like_videoPage"
          onClick={(e) => toggleLikeBtn(e, vv.Like)}
        >
          {LikeBtn ? (
            <>
              <AiFillLike size={22} className="btns_videoPage" />
            </>
          ) : (
            <>
              <AiOutlineLike size={22} className="btns_videoPage" />
            </>
          )}
          <b>{vv.Like}</b>
        </div>
        <div
          className="like_videoPage"
          onClick={(e) => togglesDislikeBtn(e, vv.Like)}
        >
          {DislikeBtn ? (
            <>
              <AiFillDislike size={22} className="btns_videoPage" />
            </>
          ) : (
            <>
              <AiOutlineDislike size={22} className="btns_videoPage" />
            </>
          )}
          <b>DISLIKE</b>
        </div>
        <div className="like_videoPage" onClick={() => toggleSavedVideo()}>
          {SaveVideo ? (
            <>
              <MdPlaylistAddCheck size={22} className="btns_videoPage" />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className="btns_videoPage" />
              <b>Save</b>
            </>
          )}
        </div>
        <div className="like_videoPage">
          <>
            <RiHeartAddFill size={22} className="btns_videoPage" />
            <b>Thanks</b>
          </>
        </div>
        <div className="like_videoPage">
          <>
            <RiShareForwardLine size={22} className="btns_videoPage" />
            <b>Share</b>
          </>
        </div>
      </div>
    </div>
  );
}

export default LikeWatchLaterSaveBtn;
