import React from "react";
import "./cast.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Castcard from "./casst_card/Castcard";
// import '..scss'
const Cast = ({ Id }) => {
  const [mov, setMov] = useState(null);
  const [obj, setObj] = useState(null);
  // const [cast, setCast] = useState([]);
  const api_key = "e8f79f8cb808ed297aa4e79d8b8c277f";
  const getcast = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${Id}/credits?api_key=` + api_key
      );
       const res2 = await axios.get(
         `https://api.themoviedb.org/3/movie/${Id}?api_key=` + api_key
       );
      setMov(res.data);
      setObj(res2.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getcast();
    //   l={{}}
    // console.log(mov[0]);
  }, [Id]);
  return (
    <>
      <div className="headr">Top Casts</div>
      <div className="det">
        {/* {mov?.cast[0].name} */}

        <Castcard
          castid={mov?.cast[0].cast_id}
          name={mov?.cast[0].original_name}
          prof={mov?.cast[0].profile_path}
          movname={obj?.original_title}
        />
        <Castcard
          castid={mov?.cast[1].cast_id}
          name={mov?.cast[1].original_name}
          prof={mov?.cast[1].profile_path}
          movname={obj?.original_title}
        />
        <Castcard
          castid={mov?.cast[2].cast_id}
          name={mov?.cast[2].original_name}
          prof={mov?.cast[2].profile_path}
          movname={obj?.original_title}
        />
        <Castcard
          castid={mov?.cast[3].cast_id}
          name={mov?.cast[3].original_name}
          prof={mov?.cast[3].profile_path}
          movname={obj?.original_title}
        />
      </div>
    </>
  );
};

export default Cast;
