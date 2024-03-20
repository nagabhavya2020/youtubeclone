import React, { useEffect, useRef, useState } from "react";
import "./VideoUpload.css";
import { useDispatch, useSelector } from "react-redux";
import { updateVideoList, uploadVideo } from "../../actions/video";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function VideoUpload({ setVidUploadPage }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [croppingParams, setCroppingParams] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [colorTone, setColorTone] = useState("#ffffff");
  const [isMuted, setIsMuted] = useState(false);
  const [segmentStart, setSegmentStart] = useState(0);
  const [segmentEnd, setSegmentEnd] = useState(0);
  const [segmentName, setSegmentName] = useState("");
  const [segments, setSegments] = useState([]);

    const [isEditMode, setIsEditMode] = useState(false);

  const handleSetVideoFile = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };
  const addSegment = () => {
    if (segmentEnd <= segmentStart) {
      alert("End time must be greater than start time!");
      return;
    }
    if (!segmentName) {
      alert("Please enter a name for the segment!");
      return;
    }
    setSegments([...segments, { start: segmentStart, end: segmentEnd, name: segmentName }]);
    setSegmentName("");
  };
  

  const fileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
      if (percentage === 100) {
        setTimeout(() => {
          setVidUploadPage(false);
        }, 3000);
      }
    },
  };

  const uploadVideoFile = () => {
    if (!title) {
      alert("please Enter A Title of the Video");
    } else if (!videoFile) {
      alert("Please Attach Video File");
    } else if (videoFile.size > 1000000) {
      alert("Please Attach Video file less than 1kb");
    } else {
      const fileData = new FormData();
      fileData.append("title", title);
      fileData.append("chanel", CurrentUser?.result._id);
      fileData.append("Uploder", CurrentUser?.result.name);
      fileData.append("file", videoFile);
      if (croppingParams.width !== 0 || croppingParams.height !== 0 || croppingParams.x !== 0
        || croppingParams.y !== 0 )
      {
        fileData.append("croppeingParams", JSON.stringify(croppingParams));
        
      }
      if( colorTone !== "#ffffff" )
      {
        fileData.append("colorTone", colorTone);
      }
      if(isMuted){
        fileData.append("isMuted", isMuted);

      }
      if(segments.length >0){
        fileData.append("segments", JSON.stringify(segments));
      }
      console.log("Segments:", segments);
      console.log("Uploder", CurrentUser?.result.name)
      dispatch(
        uploadVideo(
          {
            fileData: fileData,
            fileOptions: fileOptions,
          },
          updateVideoList(fileData)
        )
      );
    }
  };

  const resetChanges = () => {
    setCroppingParams({ width: 0, height: 0, x: 0, y: 0 });
    setColorTone(0);
    setIsMuted(false);
  
  };

  return (
    <>
      <div className="container_VidUpload">
        <input
          type="submit"
          name="text"
          value={"X"}
          onClick={() => setVidUploadPage(false)}
          className="ibtn_x"
        />
        <div className="container2_VidUpload">
          <div className="ibox_div_vidupload">
            <input
              type="text"
              className="ibox_viduplaod"
              maxLength={30}
              placeholder="Enter Title of your video"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <label htmlFor="file" className="ibox_viduplaod btn_vidupload">
              <input
                type="file"
                name="file"
                className="ibox_viduplaod"
                style={{ fontSize: "1rem" }}
                onChange={(e) => {
                  handleSetVideoFile(e);
                }}
              />
            </label>

            {isEditMode && (
              <>
                <div className="ibox_div_vidupload">
                  <h3>Crop Video</h3>
                  <label>
                    Width
                    <input
                      type="number"
                      className="ibox_viduplaod_crop"
                      value={croppingParams.width}
                      onChange={(e) =>
                        setCroppingParams({
                          ...croppingParams,
                          width: parseInt(e.target.value),
                        })
                      }
                      placeholder="Width"
                    />
                  </label>
                  <label>
                    Height
                    <input
                      type="number"
                      className="ibox_viduplaod_crop"
                      value={croppingParams.height}
                      onChange={(e) =>
                        setCroppingParams({
                          ...croppingParams,
                          height: parseInt(e.target.value),
                        })
                      }
                      placeholder="Height"
                    />
                  </label>

                  <label>
                    X
                    <input
                      type="number"
                      className="ibox_viduplaod_crop"
                      value={croppingParams.x}
                      onChange={(e) =>
                        setCroppingParams({
                          ...croppingParams,
                          x: parseInt(e.target.value),
                        })
                      }
                      placeholder="X"
                    />
                  </label>

                  <label>
                    Y
                    <input
                      type="number"
                      className="ibox_viduplaod_crop"
                      value={croppingParams.y}
                      onChange={(e) =>
                        setCroppingParams({
                          ...croppingParams,
                          y: parseInt(e.target.value),
                        })
                      }
                      placeholder="Y"
                    />
                  </label>

                  {/* Color Tone Selection */}
                  <h3>Select Color Tone</h3>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={colorTone}
                    onChange={(e) => setColorTone(e.target.value)}
                  />

                  {/* Video Preview */}
                  <video
                    controls
                    width="400"
                    src={videoFile && URL.createObjectURL(videoFile)}
                    style={{
                      filter: `hue-rotate(${colorTone}deg)`, 
                      clipPath: `inset(${croppingParams.y}px ${croppingParams.x}px 
                         ${croppingParams.height}px ${croppingParams.width}px)`,
                    }}
                    muted={isMuted}
                  />
                  {/* Mute Option */}
                  <label>
                    Mute
                    <input
                      type="checkbox"
                      checked={isMuted}
                      onChange={() => setIsMuted(!isMuted)}
                    />
                  </label>
                </div>
                </>
                )}
                {isEditMode  && (
                  <>
                {/* Video Parts */}
                <div className="ibox_div_vidupload_segments">
                <input
              type="number"
              className="ibox_viduplaod_name"
              value={segmentStart}
              onChange={(e) => setSegmentStart(parseInt(e.target.value))}
              placeholder="Segment Start Time (seconds)"
            />
            <input
              type="number"
              className="ibox_viduplaod_name"
              value={segmentEnd}
              onChange={(e) => setSegmentEnd(parseInt(e.target.value))}
              placeholder="Segment End Time (seconds)"
            />
            <input
              type="text"
              className="ibox_viduplaod_name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Segment Name"
            />
            </div>
            <div className="ibox_div_vidupload">
            <button className="btn_vidupload" onClick={addSegment}>
              Add Segment
            </button>
                  <button
                    className="ibox_viduplaod btn_addPart"
                    onClick={resetChanges}
                  >
                    Reset
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="ibox_div_vidupload">
            <button
              className="ibox_viduplaod btn_addPart"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "Save" : "Edit"}
            </button>

            <div className="ibox_div_vidupload">
              <input
                type="submit"
                value="Upload"
                className="ibox_viduplaod btn_vidupload"
                onClick={uploadVideoFile}
              />
            </div>

            <div className="loader ibox_div_vidupload">
              <CircularProgressbar
                value={progress}
                text={`${progress}`}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "20px",
                  pathTransitionDuration: 0.5,
                  pathColor: `rgba(255,255,255,${progress / 100})`,
                  textColor: "#f88",
                  trailColor: "#adff2f",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoUpload;
