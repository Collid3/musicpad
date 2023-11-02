import React, { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import Header from "../components/Header";
import HomeSongs from "../components/HomeSongs";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const Songs = () => {
  const { songs, setSongs } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate("");

  const createSong = () => {
    const newSong = {
      _id: v4(),
      title: "New Song",
      lyrics: "",
    };

    localStorage.setItem("songs", JSON.stringify([...songs, newSong]));
    setSongs((prev) => {
      return [...prev, newSong];
    });
    navigate(`/${newSong._id}`);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <button className="create-song-button" onClick={createSong}>
        Create A New Song
      </button>

      {!createSong && (
        <input
          className="search"
          type="text"
          placeholder="Search a song..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      <main>
        <HomeSongs
          songs={songs.filter(
            (song) =>
              song.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
              song.lyrics
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
          )}
          search={search}
          setSongs={setSongs}
          createSong={createSong}
        />
      </main>
    </>
  );
};

export default Songs;
