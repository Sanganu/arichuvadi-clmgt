import React from "react";
import Styling from "./Buttons.css";

function Buttons(props){
    return(<button  onClick={props.onButton}>{props.children}</button>)
}


export default Buttons;
