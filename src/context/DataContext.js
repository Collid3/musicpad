import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("songs")) {
      const fetchedSongs = JSON.parse(localStorage.getItem("songs"));

      console.log(fetchedSongs);
      setSongs(fetchedSongs);
    } else return setSongs([]);
  }, []);

  return (
    <DataContext.Provider value={{ songs, setSongs }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
