import "../styles/home.css";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const HomeSongs = ({ songs, search, setSongs, createSong }) => {
  const navigate = useNavigate("");

  const handleDelete = async (songId) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      localStorage.setItem(
        "songs",
        JSON.stringify(songs.filter((song) => song._id !== songId))
      );

      setSongs((prev) => {
        return prev.filter((song) => song._id !== songId);
      });
    } else return;
  };

  useEffect(() => {
    if (localStorage.getItem("songs")) {
      const fetchedSongs = JSON.parse(localStorage.getItem("songs"));

      setSongs(fetchedSongs);
    } else return setSongs([]);
  }, [setSongs]);

  return (
    <ul className="home-songs-container">
      {songs.length > 0 ? (
        songs.map((song) => (
          <li key={song._id} onClick={() => navigate(`/${song._id}`)}>
            <div>
              <h3>{song.title}</h3>

              <MdDelete
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(song._id);
                }}
              />
            </div>

            {song.lyrics.length > 0 && (
              <p className="home-song-lyrics">{song.lyrics}</p>
            )}
          </li>
        ))
      ) : search === "" ? (
        <p>
          No songs to display{" "}
          <Link style={{ color: "orange" }} onClick={() => createSong(true)}>
            Add Song
          </Link>
        </p>
      ) : (
        <p>
          Results for "<strong>{search}</strong>" not found
        </p>
      )}
    </ul>
  );
};

export default HomeSongs;
