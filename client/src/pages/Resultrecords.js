import React,{ Component } from 'react';

class Resultrecords extends Component
{
    render()
    {
         
            return(<div>
                         {this.props.recdetails}
                         {this.props.key}
                   </div>);
    }
}

export default Resultrecords;
