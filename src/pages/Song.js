import React, { useContext, useEffect, useState } from "react";
import Pad from "../components/Pad";
import { useParams } from "react-router-dom";
import DataContext from "../context/DataContext";

const Song = () => {
  const { songs, setSongs, mounted } = useContext(DataContext);
  const { songId } = useParams();
  const [song, setSong] = useState(
    songs.find((songItem) => (songItem = songId))
  );

  useEffect(() => {
    if (!songId || songId === "newsong") return;

    setSong(
      JSON.parse(localStorage.getItem("songs")).find(
        (song) => song._id === songId
      )
    );
  }, [songId, songs]);

  if (!songId) return;

  return (
    <Pad
      song={song}
      setSong={setSong}
      songs={songs}
      setSongs={setSongs}
      mounted={mounted}
    />
  );
};

export default Song;
