import "../styles/song.css";
import React, { useEffect, useRef, useState } from "react";
import { wordsApi } from "../Api/api";
import { useNavigate } from "react-router-dom";

const Pad = ({ song, setSong, songs, setSongs }) => {
  const [words, setWords] = useState([]);
  const wordRef = useRef("");
  const firstWordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");
  const lyricsRef = useRef();
  const titleRef = useRef();

  const searchRhymes = async (e) => {
    e.preventDefault();
    if (wordRef.current.value === "") return;
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
  }, [song, songs]);

  return (
    <main>
      <form>
        <input
          type="text"
          ref={wordRef}
          placeholder="Word you want rhymes for..."
          onSubmit={(e) => searchRhymes(e)}
        />

        <button onClick={searchRhymes} type="submit">
          Search
        </button>
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

      <h3>
        Title:{" "}
        <span>
          <input
            ref={titleRef}
            className="edit-title"
            type="text"
            placeholder="Word you want rhymes for..."
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

      <section className="lyrics-container">
        <h3>Lyrics</h3>

        <textarea
          ref={lyricsRef}
          placeholder="Write your lyrics..."
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
