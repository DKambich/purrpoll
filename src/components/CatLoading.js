import React from "react";
import CatIcon from "./CatIcon";
import { CircularProgress } from "@material-ui/core";

function CatLoading() {
  return (
    <div style={{ position: "relative" }}>
      <CatIcon style={{ color: "#9e9e9e" }} />
      <CircularProgress
        style={{ top: -8, left: -8, zIndex: 1, position: "absolute" }}
      />
    </div>
  );
}

export default CatLoading;
