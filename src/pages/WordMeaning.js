import "../styles/wordInfo.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dictionaryApi } from "../Api/api";
import WordInfo from "../components/WordInfo";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WordMeaning = () => {
  const { word } = useParams();
  const [wordInfo, setWordInfo] = useState(null);
  let definitions = [];
  let examples = [];

  useEffect(() => {
    if (!word) return;

    const fetchWordInfo = async () => {
      const response = await dictionaryApi.get(`${word}`);
      setWordInfo(response.data[0]);
    };

    fetchWordInfo();
  }, [word]);

  if (!wordInfo) return;

  return (
    <>
      <header>
        <Header />
      </header>

      <main className="word-definition-container">
        <i className="header">
          Meaning Of: <span className="word-info-name">{wordInfo.word}</span>
        </i>

        <ul>
          {wordInfo.meanings.map((meaning, index) => (
            <WordInfo
              key={index}
              meaning={meaning}
              examples={examples}
              definitions={definitions}
            />
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
};

export default WordMeaning;
