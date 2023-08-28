import React from "react";

const WordInfo = ({ meaning, definitions, examples }) => {
  return (
    <li>
      <h5 className="word-part-of-speech">{meaning.partOfSpeech}</h5>

      {meaning.definitions.map((definition) => {
        definitions.push({
          definition: definition.definition,
          partOfSpeech: meaning.partOfSpeech,
        });
      })}

      {meaning.definitions.map((definition) => {
        if (definition.example)
          examples.push({
            example: definition.example,
            partOfSpeech: meaning.partOfSpeech,
          });
      })}

      <p className="word-definitions">
        {definitions
          .filter(
            (definition) => definition.partOfSpeech === meaning.partOfSpeech
          )
          .map((definition, index) => (
            <span key={index}>{definition.definition}, </span>
          ))}
      </p>

      <div className="word-definition-examples-container">
        <p>E.g</p>
        <div className="word-definition-examples">
          {examples.length > 0 && (
            <>
              <p>
                1.{" "}
                {
                  examples.filter(
                    (example) => example.partOfSpeech === meaning.partOfSpeech
                  )[0]?.example
                }
              </p>

              {examples.filter(
                (example) => example.partOfSpeech === meaning.partOfSpeech
              ).length > 1 && (
                <p>
                  2.{" "}
                  {
                    examples.filter(
                      (example) => example.partOfSpeech === meaning.partOfSpeech
                    )[1]?.example
                  }
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default WordInfo;
