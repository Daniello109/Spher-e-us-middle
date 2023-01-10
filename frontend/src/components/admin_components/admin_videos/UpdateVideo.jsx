import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function UpdateVideos({ message, setMessage }) {
  const [video, setVideo] = useState([]);
  const [videoDetails, setVideoDetails] = useState({
    id: "",
    title: "",
    description: "",
    display: "",
    date: null,
  });
  const [updateVideoMessage, setUpdateVideoMessage] = useState(false);

  const getVideo = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/videos`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch(() => {
        console.error("video not found");
      });
  };

  useEffect(() => {
    getVideo();
  }, [message]);

  const handleUpdateMessage = () => {
    setMessage(false);
  };

  const modifyVideo = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${import.meta.env.VITE_PORT_BACKEND}/videos/${videoDetails.id}`,
        videoDetails
      )
      .then(() => {
        setUpdateVideoMessage(true);
      })
      .catch(() => {
        console.error("video not modified");
      });
  };

  return (
    <div className="update_video_container">
      <div className="update_video_title">UpdateVideos</div>
      <div className="upload_video_selection">
        {video.length > 0 && (
          <select
            className="upload_video_select"
            onChange={(e) => {
              setVideoDetails(JSON.parse(e.target.value));
            }}
            onClick={handleUpdateMessage}
          >
            <option value="">---</option>
            {video.map((v) => (
              <option
                value={JSON.stringify({
                  id: v.id,
                  title: v.title,
                  description: v.description,
                  display: v.display,
                  date: v.date.split("T")[0],
                })}
              >
                {v.title}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="update_video_form_container">
        <form onSubmit={modifyVideo} className="update_video_form">
          <div>
            <div className="update_video_form_current">
              Current title: {videoDetails.title}
            </div>
            <label htmlFor="title" className="update_video_title_label">
              Change title
            </label>
            <input
              type="text"
              id="title"
              className="update_video_title_select"
              value={videoDetails.title}
              placeholder={videoDetails.title}
              onChange={(e) =>
                setVideoDetails({ ...videoDetails, title: e.target.value })
              }
            />
          </div>

          <div>
            <div className="update_video_form_current">
              Current description: {videoDetails.description}
            </div>
            <label
              htmlFor="description"
              className="update_video_description_label"
            >
              Change description
            </label>
            <input
              type="text"
              id="description"
              className="update_video_description_select"
              value={videoDetails.description}
              placeholder={videoDetails.description}
              onChange={(e) =>
                setVideoDetails({
                  ...videoDetails,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <div className="update_video_form_current">
              Current display: {videoDetails.display}
            </div>
            <label htmlFor="display" className="update_video_display_label">
              Change display (1 =available; 0 = locked)
            </label>
            <input
              type="text"
              id="display"
              className="update_video_display_select"
              value={videoDetails.display}
              placeholder={videoDetails.display}
              onChange={(e) =>
                setVideoDetails({ ...videoDetails, display: e.target.value })
              }
            />
          </div>

          <div>
            <div className="update_video_form_current">
              Current date: {videoDetails.date}
            </div>
            <label htmlFor="date" className="update_video_date_label">
              Change date
            </label>

            <input
              type="date"
              id="date"
              className="update_video_date_select"
              value={videoDetails.date}
              placeholder={videoDetails.date}
              onChange={(e) =>
                setVideoDetails({ ...videoDetails, date: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="submit"
              className="update_video_update_btn"
              value="Update"
            />
          </div>
          <div
            className={
              updateVideoMessage ? "update_message" : "update_message_not"
            }
          >
            <h2>Video has been Updated!</h2>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateVideos.propTypes = {
  message: PropTypes.bool.isRequired,
  setMessage: PropTypes.string.isRequired,
};

export default UpdateVideos;
