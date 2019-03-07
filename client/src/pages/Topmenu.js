import  React,{ Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';


class Topmenu extends Component {
        render()
        {
            return(<nav className = 'otherlinks'>
                   
                           <Link to = '/teacher/batchmain' className = 'tlink'>New Batch</Link>
                           <Link to = '/teacher/searchrecords' className = 'tlink'>Search<i class="fa fa-search"></i></Link>
                           <Link to = '/teacher/studentmanagement' className  = 'tlink'>Student Details</Link> 
                           <Link to  = '/' className  = 'tlink'>Home</Link>
                           <Link to = '/teacher/studentmanagement' className  = 'tlink'>Student Details</Link> 
                           <Link to = '/teacher/allbatch' className  = 'tlink' >All Batches</Link>
            </nav>); //end return
        } //end render
}// end topmenu

export default Topmenu;

    