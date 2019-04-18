import React from 'react';
import Teacherheader from "../components/Teacherheader";
import { Menubar } from "../components/Menubar";
import "../resources/ukgbook.pdf";

const Books= () => {

        return (<div>
            <Teacherheader />
            <div className="middlecontent">
                <div className="row" >
                    <div className="col-lg-1 col-md-12 col-sm-12">
                        <Menubar />
                    </div>
                    <div className="col-lg-11 col-md-12 col-sm-12">
                       <h4 className = "subhead">Suggested Books</h4>
                        
                    <embed src="ukgbook.pdf" 
                  type="application/pdf" width="95%" height="600px" /> 
                    </div>
                </div> 
            </div>
        </div>); //end return function
   
} // End class Booklist
         
export default Books;
