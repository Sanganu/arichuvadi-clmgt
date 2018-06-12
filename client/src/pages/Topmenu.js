import  React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Topmenu extends Component {
        render()
        {
            return(<div className = 'otherlinks'>
                   
                           <Link to = '/teacher/batchmain' className = 'mainlink'>Create New Batch</Link>
                           <Link to = '/teacher/studentrecords' className = 'mainlink'>Search</Link>
                            <Link to = '/teacher/addstudent' classname  = 'mainlink'>Student Details</Link> 
                   
            </div>); //end return
        } //end render
}// end topmenu

export default Topmenu;

