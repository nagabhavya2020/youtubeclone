import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { FaEllipsisV } from "react-icons/fa";
import vid from "../../Components/Video/vid.mp4";
import "./VideoPage.css";
import LikeWatchLaterSaveBtn from "./LikeWatchLaterSaveBtn";
import Comments from "../../Components/Comments/Comments";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { addToHistory } from "../../actions/history";
import { viewVideo } from "../../actions/video.js";
import {
  unsubscribe,
  subscribe,
  subscriptionStatus,
} from "../../actions/subscriber.js";
import { getAllComment } from "../../actions/comments.js";

function VideoPage() {
  const { vid } = useParams();
  // console.log(vid);

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const dispatch = useDispatch();
  const vids = useSelector((state) => state.videoReducer);
  console.log(vids);
  const vv = vids?.data.filter((q) => q._id === vid)[0];
  console.log(vv.videoChanel);

  const handleHistory = () => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  };

  const handleViews = () => {
    dispatch(
      viewVideo({
        id: vid,
      })
    );
  };

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    console.log("Unsubscribe button clicked");
    if (CurrentUser) {
      dispatch(
        unsubscribe({
          chanelId: vv.videoChanel,
          userId: CurrentUser?.result._id,
        })
      );
      setIsSubscribed(false);
    }
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("subscribe button clicked");
    if (CurrentUser) {
      dispatch(
        subscribe({
          chanelId: vv.videoChanel,
          userId: CurrentUser?.result._id,
        })
      );
      setIsSubscribed(true);
    } else {
      alert("You need to login to subscribe");
    }
  };

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (CurrentUser) {
        try {
          const response = await subscriptionStatus({
            chanelId: vv.videoChanel,
            userId: CurrentUser.result._id,
          });

          setIsSubscribed(response?.isSubscribed || false);
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkSubscriptionStatus();
  }, [CurrentUser, vv.videoChanel, isSubscribed]);
  console.log("isSubscribed:", isSubscribed);

  useEffect(() => {
    dispatch(getAllComment());
    if (CurrentUser) {
      handleHistory();
    }
    handleViews();
  }, []);

  const qualities = ["320p", "480p", "720p", "1080p"];
  const [selectedQuality, setSelectedQuality] = useState("320p");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showQualityOptions,setShowQualityOptions]  = useState(false);
  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
    setShowQualityOptions(false);
    setShowMoreOptions(false)
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const handleQualityClick =() =>{ 
    setShowQualityOptions(!showQualityOptions);

  }

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_dispaly_screen_videoPage">
            {isSubscribed ? (
              <>
                <div className="react-player-container">
                  <ReactPlayer
                    url={`http://youtubeclone-client.vercel.app/${
                      vv?.[`filePath_${selectedQuality}`]
                    }`}
                    className={"video_ShowVideo_videoPage"}
                    controls
                    autoPlay
                    playing
                  />
                  <div
                    className={`more-options-container ${
                      showMoreOptions ? "visible" : ""
                    }`}
                  >
                    <button
                      onClick={handleMoreOptions}
                      className="more-options-button"
                    >
                      <FaEllipsisV />
                    </button>
                    {showMoreOptions && (
                      <div className="quality-menu">
                        <button onClick={handleQualityClick}>Quality</button>
                        {showQualityOptions && (

                        <select
                          id="quality-dropdown"
                          value={selectedQuality}
                          onChange={(e) => handleQualityChange(e.target.value)}
                        >
                          {qualities.map((quality) => (
                            <option key={quality} value={quality}>
                              {quality}
                            </option>
                          ))}
                        </select>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="video_ShowVideo_videoPage_text">
                <h1>You need to Subscribe</h1>
              </div>
            )}

            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>

                  <LikeWatchLaterSaveBtn
                    vv={vv}
                    vid={vid}
                    isSubscribed={isSubscribed}
                  />
                </div>
              </div>

              <Link
                to={`/chanel/${vv?.videoChanel}`}
                className="chanel_details_videoPage"
              >
                <b className="chanel_logo_videoPage">
                  <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.Uploder}</p>

                {isSubscribed ? (
                  <button onClick={handleUnsubscribe}>Unsubscribe</button>
                ) : (
                  <button onClick={handleSubscribe}>Subscribe</button>
                )}
              </Link>
              <div className="comments_videoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments videoId={vv._id} isSubscribed={isSubscribed} />
              </div>
            </div>
            <div className="moreVideoBar">More video</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
