import React from "react";
import "./Buttons.css";

function Buttons(props) {
  const className = `app-btn ${props.className || ""}`.trim();
  return (
    <button
      type="submit"
      onClick={props.onButton}
      className={className}
      data-testid={props["data-testid"]}
    >
      {props.children}
    </button>
  );
}

export default Buttons;