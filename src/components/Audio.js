import "../styles/audio.css";
import React, { useContext, useEffect, useRef } from "react";
import DataContext from "../context/DataContext";

const Audio = () => {
  const { nowPlaying } = useContext(DataContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!nowPlaying) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }, [nowPlaying]);

  return (
    <div className="audio-container">
      <audio ref={audioRef} src={nowPlaying.url} controls autoPlay />
    </div>
  );
};

export default Audio;
