import React, { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeSongs from "../components/HomeSongs";
import CreateSong from "../components/CreateSong";

const Songs = () => {
  const { songs, setSongs } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [createSong, setCreateSong] = useState(false);

  return (
    <>
      <header>
        <Header />
      </header>
      {createSong ? (
        <CreateSong
          setCreateSong={setCreateSong}
          songs={songs}
          setSongs={setSongs}
        />
      ) : (
        <button
          className="create-song-button"
          onClick={() => setCreateSong(true)}
        >
          Create A New Song
        </button>
      )}

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
          setCreateSong={setCreateSong}
        />
      </main>

      <Footer />
    </>
  );
};

export default Songs;
