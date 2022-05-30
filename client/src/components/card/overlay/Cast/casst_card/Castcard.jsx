import React from "react";
import "./castcard.scss";
const Castcard = ({ castid, name, prof ,movname}) => {
  return (
    <>
      <div
        className="card"
        onClick={() => {
          window.open(`http://www.google.com/search?q=${name}${"  in  "}${movname}`);
        }}
      >
        <img
          className="image"
          src={"https://image.tmdb.org/t/p/w200" + prof}
          alt="#"
        />
        <div className="naam">{name}</div>
      </div>
    </>
  );
};

export default Castcard;
