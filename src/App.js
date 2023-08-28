import "./App.css";
import Song from "./pages/Song";
import Songs from "./pages/Songs";
import { Routes, Route } from "react-router-dom";
import WordMeaning from "./pages/WordMeaning";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Songs />} />
        <Route path="/:songId" element={<Song />} />
        <Route path="/info/:word" element={<WordMeaning />} />
      </Routes>
    </div>
  );
}

export default App;
