import { createContext, useEffect, useState } from "react";
import api, { wordsApi } from "../Api/api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const me = {
    _id: "64e45d05974b4af610a9dab3",
    email: "seroba@gmail.com",
  };
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchedSongs = JSON.parse(localStorage.getItem("songs"));

    setSongs(fetchedSongs);
  }, []);

  return (
    <DataContext.Provider value={{ songs, me, setSongs }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
