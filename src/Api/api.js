import axios from "axios";

export const wordsApi = axios.create({
  baseURL: "https://rhymebrain.com/talk?function=getRhymes&word=",
});

export const dictionaryApi = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
});

export const api = axios.create({
  baseURL: "http://localhost:4000",
});
