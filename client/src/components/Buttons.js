import React from "react";
import Styling from "./Buttons.css";

function Buttons(props){
    return(<button  className="createbutton" onClick={props.onbutton}>{props.name}</button>)
}


export default Buttons;
