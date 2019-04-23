import React from 'react';
import Teacherheader from "../components/Teacherheader";
import { Menubar } from "../components/Menubar";
import "../resources/ukgbook.pdf";

const Resources = () => {

        return (<div>
            <Teacherheader />
            <div className="middlecontent">
                <div className="row" >
                    <div className="col-lg-1 col-md-12 col-sm-12">
                        <Menubar />
                    </div>
                    <div className="col-lg-11 col-md-12 col-sm-12">
                       <h4 className = "subhead">Resources</h4>
                       <ul className="list-unstyled list-group">
                           <li className="list-group-item">
                           <a href ="http://www.tamilvu.org/en/text-books" target="_blank" rel="noopener noreferrer"
                           >University Suggested Books link</a></li>
                           <li className="list-group-item">
                           <a href ="http://www.tamilvu.org/en/primary-course" target="_blank" rel="noopener noreferrer"
                           >University - Online Games</a></li>
                           <li className="list-group-item">
                           <a href ="https://www.google.com/intl/ta/inputtools/try/" target="_blank" rel="noopener noreferrer"
                           >Online Writing Tool</a></li>
                        </ul>   
                            <embed src="ukgbook.pdf" 
                        type="application/pdf" width="95%" height="95%" /> 
                    </div>
                </div> 
            </div>
        </div>); //end return function
   
} // End class Booklist
         
export default Resources;
