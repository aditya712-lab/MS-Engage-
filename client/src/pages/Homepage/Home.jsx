import React from "react";
import { useEffect } from "react";
import Cards from "../../components/card/Card";
import TopBar from "../../components/TopBar/TopBar";

import "./cards.css";
import { axiosInstance } from "../../config";
import { useState } from "react";
import "./home.css";
import Overlay from "../../components/card/overlay/Overlay";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [curr, setCurr] = useState(null);
  const [genreslist, setGenresList] = useState([]);
  const getgenres = async () => {
    try {
      const res = await axiosInstance.post("/genres/");
      setGenresList(res.data);

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getgenres();
  }, []);

  const getmovies = async () => {
    try {
      const res = await axiosInstance.post("/movies/", { count: 20 });
      setMovies(res.data);
      // console.log(res.data[0].name);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getmovies();
  }, []);
  return (
    <>
      <div className="all">
        <div className="top">
          <TopBar
            setCurr={setCurr}
            setMovies={setMovies}
            genreslist={genreslist}
          />
        </div>
        {/* <div className="name">
          Movies Recommendation Engine
        </div> */}
        {curr ? (
          <Overlay movie={curr} setCurr={setCurr} />
        ) : (
          <div className="cards">
            {movies.map((obj) => (
              <Cards Id={obj.id} setCurr={setCurr} />
            ))}
          </div>
        )}
      </div>
      
    </>
  );
};

export default Home;
