import "../styles/song.css";
import React, { useEffect, useRef, useState } from "react";
import { wordsApi } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const Pad = ({ song, setSong, songs }) => {
  const [words, setWords] = useState([]);
  const wordRef = useRef("");
  const firstWordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");
  const lyricsRef = useRef();
  const titleRef = useRef();

  const searchRhymes = async (e) => {
    e.preventDefault();
    if (e.target.value === "") return;
    setLoading(true);

    try {
      const response = await wordsApi.get(
        `${wordRef.current.value}&maxResults=100`
      );

      setWords(response.data.sort((a, b) => b.score - a.score));
      if (firstWordRef.current) {
        firstWordRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
      return setLoading(false);
    } catch (err) {
      setLoading(false);
      return console.log(err.message);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "songs",
      JSON.stringify(
        songs.map((Song) =>
          Song._id === song._id
            ? {
                ...song,
                title: titleRef.current.value,
                lyrics: lyricsRef.current.value,
              }
            : Song
        )
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  return (
    <main>
      <p className="back-button" onClick={() => navigate("/")}>
        <MdKeyboardBackspace />
      </p>

      <h3>
        Title:{" "}
        <span>
          <input
            ref={titleRef}
            className="edit-title"
            type="text"
            placeholder="New Title..."
            onSubmit={(e) => searchRhymes(e)}
            value={song.title}
            onChange={(e) =>
              setSong((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
        </span>
      </h3>

      <form className="song-form" onSubmit={(e) => searchRhymes(e)}>
        <input
          type="text"
          ref={wordRef}
          placeholder="Word you want rhymes for..."
        />

        <button type="submit">Search</button>
      </form>

      {words.length > 0 && (
        <p
          style={{
            textAlign: "start",
            marginTop: "5px",
            fontSize: "1rem",
            color: "orange",
          }}
        >
          Click a word to get it's meaning
        </p>
      )}

      <ul className="words-container">
        {!loading ? (
          words.map((word, index) => (
            <li
              key={index}
              ref={index === 0 ? firstWordRef : null}
              onClick={() => navigate(`/info/${word.word}`)}
            >
              {word.word}
            </li>
          ))
        ) : (
          <p>Loading words...</p>
        )}

        {!loading && words.length === 0 && <p>Search a word to get rhymes</p>}
      </ul>

      <section className="lyrics-container">
        <h3>Lyrics:</h3>

        <textarea
          ref={lyricsRef}
          placeholder="Lyrics..."
          spellCheck={false}
          value={song.lyrics}
          onChange={(e) =>
            setSong((prev) => {
              return { ...prev, lyrics: e.target.value };
            })
          }
        />
      </section>
    </main>
  );
};

export default Pad;
