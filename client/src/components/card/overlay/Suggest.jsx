import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useEffect, useState } from "react";
import { SettingsInputComponentSharp } from "@mui/icons-material";
import '../card.css';
import CardMedia from "@mui/material/CardMedia";
import { sizing } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Overlay from "./Overlay";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Suggest({ Id, setCurr }) {
  const [movie, setMovie] = useState(null);
  const [playc, setPlayc] = useState(false);
  const [vid, setVid] = useState("");
  const api_key = "e8f79f8cb808ed297aa4e79d8b8c277f";
  const getmovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${Id}?api_key=` + api_key
      );
      const vidfetch = await axios.get(
        `https://api.themoviedb.org/3/movie/${Id}/videos?api_key=` + api_key
      );

      setVid(vidfetch.data.results[0].key);
      setMovie(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getmovies();
  }, [Id]);
  ////////////////////////////
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {playc ? (
        <Overlay />
      ) : (
        // ""
        <span
          className="card-cont"
          onClick={() => {
            movie && setCurr(movie);
          }}
        >
          <Card sx={{ maxWidth: 190, cursor: "pointer" }}>
            <img
              className="poster"
              src={"https://image.tmdb.org/t/p/w300" + movie?.poster_path}
            ></img>
          </Card>

          <div className="fav" typeof="text">
            {movie?.genres[0].name}
            <FavoriteBorderIcon
              sx={{ marginLeft: "15px", color: "red", cursor: "pointer" }}
            />
            <div className="play" onClick={() => setPlayc(true)}>
              <PlayCircleFilledWhiteIcon
                sx={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
              />
            </div>
          </div>
        </span>
      )}
    </>
  );
}
