import React, { useRef, useState } from "react";
import { v4 } from "uuid";

const CreateSong = ({ setCreateSong, setSongs, songs }) => {
  const [loading, setLoading] = useState(false);
  const titleRef = useRef("");

  const handleCreateSong = async () => {
    if (titleRef.current.value === "") return;
    setLoading(true);

    const newSong = {
      _id: v4(),
      title: titleRef.current.value,
      lyrics: "No Lyrics!",
    };

    localStorage.setItem("songs", JSON.stringify([...songs, newSong]));
    setSongs((prev) => {
      return [...prev, newSong];
    });
    setLoading(false);
    titleRef.current.value = "";
    setCreateSong(false);
  };

  return (
    <div className="create-song-container" onSubmit={(e) => e.preventDefault()}>
      {loading && <p>Creating song...</p>}
      <input type="text" placeholder="New Song Title" ref={titleRef} />
      <button
        className="create-song-cancel-button"
        onClick={() => setCreateSong(false)}
      >
        Cancel
      </button>
      <button onClick={handleCreateSong}>Add</button>
    </div>
  );
};

export default CreateSong;
