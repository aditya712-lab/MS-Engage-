import * as React from "react";

import Card from "@mui/material/Card";

import axios from "axios";
import { useEffect, useState } from "react";

import "./card.scss";

import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

export default function Cards({ Id, setCurr }) {
  const [movie, setMovie] = useState(null);

  const api_key = "e8f79f8cb808ed297aa4e79d8b8c277f";
  const getmovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${Id}?api_key=` + api_key
      );

      setMovie(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getmovies();
  }, [Id]);

  return (
    <>
      <span className="card-cont">
        <Card sx={{ maxWidth: 190, cursor: "pointer" }}>
          <img
            className="poster"
            src={
              movie?.poster_path === undefined
                ? "https://www.bradfordbuilt.com/uploads/8/6/9/0/86908622/al-ss-loading_orig.jpg"
                : "https://image.tmdb.org/t/p/w300" + movie?.poster_path
            }
          ></img>
        </Card>

        <div className="fav" typeof="text">
          {movie?.genres[0].name}

          <div
            className="play"
            onClick={() => {
              movie && setCurr(movie);
            }}
          >
            <div className="playbtn">
              <PlayCircleFilledWhiteIcon
                sx={{ marginLeft: "15px", color: "red", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </span>
    </>
  );
}
