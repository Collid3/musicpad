import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Pad from "../components/Pad";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import DataContext from "../context/DataContext";

const Song = () => {
  const { songs, setSongs } = useContext(DataContext);
  const { songId } = useParams(null);
  const [song, setSong] = useState({
    _id: "newsong",
    title: "",
    lyrics: "",
  });

  useEffect(() => {
    if (!songId || songId === "newsong") return;

    setSong(
      JSON.parse(localStorage.getItem("songs")).find(
        (song) => song._id === songId
      )
    );
  }, [songId, songs]);

  if (!songId) return;

  if (!song || song.title === "") return;

  return (
    <>
      <Header />
      <Pad song={song} setSong={setSong} songs={songs} setSongs={setSongs} />
      <Footer />
    </>
  );
};

export default Song;
