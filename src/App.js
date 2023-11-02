import "./App.css";
import Song from "./pages/Song";
import Songs from "./pages/Songs";
import { Routes, Route } from "react-router-dom";
import WordMeaning from "./pages/WordMeaning";
import SideBar from "./components/SideBar";
import Audio from "./components/Audio";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  const { me, nowPlaying, globalLoading, globalError } =
    useContext(DataContext);

  if (globalLoading) {
    return (
      <h1 style={{ height: "100vh", display: "grid", placeContent: "center" }}>
        Loading...
      </h1>
    );
  }

  if (globalError) {
    return (
      <h1
        style={{
          height: "100vh",
          display: "grid",
          placeContent: "center",
          width: "min(500px, 80%)",
          margin: "auto",
          textAlign: "center",
        }}
      >
        {globalError}
      </h1>
    );
  }

  return (
    <div className="App">
      {!me ? (
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <SideBar />

          <section className={`${nowPlaying ? "playing" : undefined}`}>
            <Routes>
              <Route path="/*" element={<Songs />} />
              <Route path="/:songId" element={<Song />} />
              <Route path="/info/:word" element={<WordMeaning />} />
            </Routes>

            {nowPlaying && <Audio />}
          </section>
        </>
      )}
    </div>
  );
}

export default App;
