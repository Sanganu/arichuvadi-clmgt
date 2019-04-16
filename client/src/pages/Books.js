import React, { Component } from 'react';
import Teacherheader from "../compoenents/Teacherheader";
import { Menubar } from "../components/Menubar";

class Booklist extends Component {
    render() {
        return (<div>
            <Teacherheader />
            <div className="container middlecontent">
                <div className="row" >
                    <div className="col-lg-1 col-md-1 col-sm-12">
                        <Menubar />
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm-11">
                       <h4>Suggested Books</h4>
                       
                        {/* <embed src="https://drive.google.com/open?id=1JLehbP72__zZwZfMuyPeOnhzbiC8lpgOs" 
                        type="application/pdf"
                         width="100%" height="600px" /> */}
                         {/* <iframe src="https://drive.google.com/open?id=1JLehbP72__zZwZfMuyPeOnhzbiC8lpgOs" 
                         style="width:600px; height:500px;" frameborder="0"></iframe> */}
                    </div>
                </div>        
            </div>
        </div>); //end return function
    } // End Render function
} // End class Booklist
         
export default Booklist;
