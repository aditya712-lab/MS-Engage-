import React from "react";
import { MenuItem } from "@mui/material";

const Filteropns = ({ handleClose, setGenres, genreslist, genres }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  return (
    <>
      {genreslist.map((obj) => (
        <MenuItem
          className={"genre-item " + (genres.includes(obj) ? "selected" : "")}
          key={obj}
          onClick={() => {
            handleClose();

            setGenres((prev) => {
              if (prev.includes(obj) === true) {
                return prev.filter((f) => f !== obj);
              } else {
                return [...prev, obj];
              }
            });
          }}
          disableRipple
        >
          {obj}
        </MenuItem>
      ))}
    </>
  );
};

export default Filteropns;
