import React,{ Component } from 'react';
import axios from 'axios';

class Visitor extends Component {
    componentDidMount=()=>{
        axios.get('/api/visitors')
             .then((videos) =>{
               console.log("Videos Received",videos);
             }).catch((error) => {
                 console.log("Error....",error);
             });
    }

    render(){
            return(<div>

            </div>)
    }
    
}

export default Visitor;
