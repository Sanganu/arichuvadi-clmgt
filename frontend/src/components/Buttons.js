import React from "react";
import  "./Buttons.css";

function Buttons(props){
    return(<button  type="submit" onClick={props.onButton}>{props.children}</button>)
}


export default Buttons;
