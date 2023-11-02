import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { api } from "../Api/api";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [songs, setSongs] = useState([]);
  const [beats, setBeats] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);
  const navigate = useNavigate("");

  useEffect(() => {
    onAuthStateChanged(auth, async (owner) => {
      // await signOut(auth);
      if (!owner) {
        setGlobalLoading(false);
        return setMe(null);
      }

      try {
        const response = await api.post("/auth", { email: owner.email });
        const songsResponse = await api.get(
          `/song/all/${response.data.user._id}`
        );
        setBeats(songsResponse.data.songs);

        navigate("/");
        setGlobalLoading(false);
        return setMe(response.data.user);
      } catch (err) {
        if (err.message === "Network Error") {
          setGlobalLoading(false);
          return setGlobalError(
            "Network error. Check your internet connection and try again"
          );
        }
        return setGlobalLoading(false);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{
        me,
        setMe,
        songs,
        setSongs,
        beats,
        setBeats,
        nowPlaying,
        setNowPlaying,
        globalError,
        globalLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
