import React, { useContext } from "react";
import { useState } from "react";
import ListMovie from "../components/ListMovie";
import {
  PlayIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Movie = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const nav = useNavigate();

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onClickSearch = () => {
    setSearch(text);
  };

  const handleThemeChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  const handleOnExit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    nav("/login");
  };

  return (
    <div>
      <div className="sticky -top-28 pt-10 z-10">
        <div className="flex justify-center items-center gap-3">
          <div className=" bg-red-100 p-3 rounded-lg">
            <PlayIcon className="aspect-auto h-10 text-red-600" />
          </div>
          <h1 className="text-5xl font-semibold">Movie Searcher</h1>
        </div>
        <div className="search h-16 mt-10">
          <input
            placeholder="Search Movie"
            onChange={onChangeText}
            type="text"
            className="w-full h-full px-6 text-xl dark:text-gray-700"
          />
          <button
            onClick={onClickSearch}
            className="h-full px-5 text-xl bg-red-600 text-white hover:bg-red-700 font-medium"
          >
            Search
          </button>
          <button
            className="aspect-square h-full bg-white dark:bg-gray-700"
            onClick={handleThemeChange}
          >
            {theme === "light" ? "🌞" : "🌜"}
          </button>
          <button
            className="aspect-square h-full flex justify-center items-center bg-red-600 hover:bg-red-700 text-white"
            onClick={handleOnExit}
          >
            <ArrowLeftStartOnRectangleIcon className="aspect-square h-6" />
          </button>
        </div>
      </div>
      <div className="py-10">
        <ListMovie search={search} />
      </div>
    </div>
  );
};

export default Movie;
