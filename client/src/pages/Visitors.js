import React, { Component } from 'react';
import Teacherheader from '../components/Teacherheader';
import Footer from '../components/Footer';
import axios from 'axios';


class Visitors extends Component 
{
  componentDidMount = () =>{
    axios.get()
         .then()
         .catch()
  }
      render()
      {
           return(<div>
                     <Teacherheader />
                   <div className = "vcontent">
                           </div>
                 <Footer />
           </div>)
      }
}

export default Visitors
