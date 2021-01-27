import React, { useContext, useEffect, useReducer, useState } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState("");
  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINT}&query=${query}&page=${page}`
      );
      const data = await response.json();
      setStories(data.hits);
      setNumberOfPages(data.nbPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [query, page]);

  const remove = (id) => {
    const newStories = stories.filter((item) => item.objectID !== id);
    setStories(newStories);
  };

  const nextBtn = () => {
    setPage((oldPage) => {
      const nextPage = oldPage + 1;
      if (nextPage > numberOfPages - 1) {
        return 0;
      }
      return nextPage;
    });
  };
  console.log(page);

  const prevBtn = () => {
    setPage((oldPage) => {
      const prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = numberOfPages - 1;
      }
      return prevPage;
    });
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        stories,
        query,
        setQuery,
        remove,
        page,
        numberOfPages,
        nextBtn,
        prevBtn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
