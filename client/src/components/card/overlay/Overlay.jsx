import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./overlay.scss";
import { useState, useEffect } from "react";

import { axiosInstance } from "../../../config";

import Cards from "../Card";
import Cast from "./Cast/Cast";

export default function Overlay({ movie, setCurr }) {
  function time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes;
  }
  const [suggest, setSuggest] = useState([]);
  const [count, setCount] = useState(5);

  const getmovies = async () => {
    try {
      const res = await axiosInstance.post("/recommend/", {
        name: movie?.original_title,
        count: count,
      });

      setSuggest(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getmovies();
  }, [movie, count]);
  function numberWithCommas(x) {
    if (x == "0") {
      return "Unknown";
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  return (
    <>
      <div className="whole">
        <div className="banner">
          <button
            className="btn"
            onClick={() => {
              setCurr(null);
            }}
          >
            <ArrowBackIcon />
          </button>
          <img src={"https://image.tmdb.org/t/p/w300" + movie?.poster_path} />
          <div className="watch">
            <button
              className="watchbtn"
              onClick={() => {
                window.open(movie?.homepage);
              }}
            >
              Now Streaming
              <br />
              Watch Now!
            </button>
          </div>
        </div>
        <div className="text">
          <h2 className="head">{movie?.original_title}</h2>
          <div className="hbelow">
            <div className="reldate">
              <div className="relh">{"Release Date:"}</div>
              {movie?.release_date} (
              {movie?.production_companies?.[0].origin_country})
            </div>{" "}
            <div className="runtime">
              <div className="durh">{"  Duration: "}</div>
              <div className="durcont">{time_convert(movie?.runtime)}hrs</div>
            </div>
            <div className="threegenres">
              <div className="genh">{"Genres: "}</div>
              <div className="gencont">
                {movie?.genres?.[0]?.name}
                {" , "}
                {movie?.genres?.[1]?.name}
                {" , "} {movie?.genres?.[2]?.name}
                {"  "}
              </div>
            </div>
            <div className="rating">
              <div className="rath">{"Rating : "}</div>
              <div className="ratcont">{movie?.vote_average}</div>
            </div>
            <div className="budget">
              <div className="bugh">{"Budget: "}</div>
              <div className="bughcont">
                {"$"}
                {numberWithCommas(movie?.budget)}
              </div>
            </div>
            <div className="gross">
              <div className="grossh">{"Gross Collection: "}</div>
              <div className="grosscont">
                {"$"}
                {numberWithCommas(movie?.revenue)}
              </div>
            </div>
          </div>
          <div className="overview">
            <h3 className="overhead">Overview</h3>
            {movie?.overview}
          </div>
        </div>
      </div>

      <div className="cast">
        <Cast Id={movie?.id} />
      </div>
      <div className="countnum">
        <div className="rec">Recommendations For You!</div>
        <div className="count">
          <input
            type="number"
            onChange={(e) => setCount(e.target.value)}
          ></input>
        </div>
        <div className="setcnt">(Set Count)</div>
      </div>

      <div className="cards">
        {suggest.map((obj) => (
          <Cards Id={obj} setCurr={setCurr} />
        ))}
      </div>
    </>
  );
}
