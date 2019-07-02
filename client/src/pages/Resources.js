import React from 'react';
// import Teacherheader from "../components/Teacherheader";
import { Menubar } from "../components/Menubar";
import "../resources/ukgbook.pdf";

const Resources = () => {

    return (<div className="middlecontent">

            <h3 className="reshead">Resources</h3>
            <ul className="list-unstyled list-group">
                <li className="list-group-item">
                    <a href="http://www.tamilvu.org/en/text-books" target="_blank" rel="noopener noreferrer"
                    >University Suggested Books</a></li>
                <li className="list-group-item">
                    <a href="http://www.tamilvu.org/en/primary-course" target="_blank" rel="noopener noreferrer"
                    >Online Games</a></li>
                <li className="list-group-item">
                    <a href="https://www.google.com/intl/ta/inputtools/try/" target="_blank" rel="noopener noreferrer"
                    >Online Google - Writing Tool</a></li>
                <li className="list-group-item" >
                    <a href='https://commons.wikimedia.org/wiki/Category:Animated_GIF_of_Tamil_letters' className='sidemenulink' target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-asterisk"></i> Writing Gif</a></li>
                <li className="list-group-item">
                    <a href="https://sketch.io/sketchpad/" target="_blank" rel="noopener noreferrer"
                    >Online Sketchpad - If you have touch screen, try this</a></li>
            </ul>
            
        </div>
      ); //end return function

} // End class Booklist

export default Resources;
