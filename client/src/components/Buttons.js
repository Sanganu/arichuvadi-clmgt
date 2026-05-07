import React from "react";
import  "./Buttons.css";

function Buttons(props){
    return(<button  type="submit" onClick={props.onButton}>{props.children}</button>)
}


export default Buttons;



// import React from "react";
// import "./Buttons.css";

// function Buttons(props) {
//   return (
//     <button
//       type="submit"
//       onClick={props.onButton}
//       className={props.className || ""}
//     >
//       {props.children}
//     </button>
//   );
// }

// export default Buttons;


// <Buttons
//   onButton={this.updateBatch}
//   className={this.state.isDirty ? "is-dirty" : ""}
// >
//   <i className="fa fa-edit fa-lg"></i>
//   {this.state.isDirty ? " Save Changes" : " Update"}
// </Buttons>