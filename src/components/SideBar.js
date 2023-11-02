import "../styles/sidebar.css";
import React, { useContext, useRef, useState } from "react";
import { HiMusicNote } from "react-icons/hi";
import { MdGraphicEq } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import DataContext from "../context/DataContext";

import { IoMdAdd } from "react-icons/io";
import { api } from "../Api/api";
import SidebarMenu from "./SidebarMenu";

const SideBar = () => {
  const { me, nowPlaying, setNowPlaying, beats, setBeats } =
    useContext(DataContext);

  const [menu, setMenu] = useState({ opened: false, beat: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (file) => {
    setLoading(true);
    setLoadingMessage("Adding song. Please wait...");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const response = await api.post("/song", {
          song: reader.result,
          name: file.name.slice(0, -4),
          owner: me._id,
        });
        setBeats((prev) => {
          return [...prev, response.data.song];
        });
        setLoading(false);
        setLoadingMessage(null);
        return setError(null);
      } catch (err) {
        setError(err.response.data.error);
        setTimeout(() => {
          setError(null);
        }, 3000);
        setLoadingMessage(null);
        return setLoading(false);
      }
    };
  };

  return (
    <div className="sidebar-container">
      <h2>MUSICPAD</h2>

      {!loading && !responseMessage && (
        <button onClick={() => inputRef.current.click()}>
          Add New Music
          <IoMdAdd />
        </button>
      )}

      <input
        ref={inputRef}
        className="add-song-input"
        type="file"
        onChange={(e) => handleChange(e.target.files[0])}
        accept="audio/*"
      />

      {error && !loading && (
        <p
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "5px 1rem",
            borderRadius: "1rem",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      {loading && (
        <p
          style={{
            backgroundColor: "#0c4a60",
            color: "white",
            padding: "1rem",
            borderRadius: "1rem",
            textAlign: "center",
            marginBottom: "1.3rem",
            marginTop: "1.8rem",
          }}
        >
          {loadingMessage}
        </p>
      )}

      {responseMessage && (
        <p
          style={{
            backgroundColor: "#0c4a60",
            color: "white",
            padding: "1rem",
            borderRadius: "1rem",
            textAlign: "center",
            marginBottom: "1.3rem",
            marginTop: "1.8rem",
          }}
        >
          {responseMessage}
        </p>
      )}

      <ul className="songs-container">
        {beats.map((beat, index) => (
          <li
            key={index}
            className={`song ${
              beat._id === nowPlaying?._id ? "playing" : undefined
            }`}
          >
            <p
              onClick={() => {
                setMenu({ opened: false, beat: null });
                setNowPlaying(beat);
              }}
            >
              {beat.name}{" "}
            </p>

            <div>
              {beat._id === nowPlaying?._id ? (
                <MdGraphicEq className="music-playing-icon" />
              ) : (
                <HiMusicNote className="music-playing-icon" />
              )}

              <section>
                {!(menu.opened && menu?.beat?._id === beat._id) ? (
                  <FiMenu
                    onClick={() => setMenu({ opened: true, beat: beat })}
                  />
                ) : (
                  <LiaTimesSolid
                    onClick={() => setMenu({ opened: false, beat: null })}
                  />
                )}

                <SidebarMenu
                  api={api}
                  menu={menu}
                  beat={beat}
                  nowPlaying={nowPlaying}
                  setBeats={setBeats}
                  setResponseMessage={setResponseMessage}
                  setLoadingMessage={setLoadingMessage}
                  setLoading={setLoading}
                  setMenu={setMenu}
                />
              </section>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
