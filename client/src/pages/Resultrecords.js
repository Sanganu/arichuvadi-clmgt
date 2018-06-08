import React,{ Component } from 'react';

class Resultrecords extends Component
{  
    render()
    {
            
            return(<div>
                         {this.props.field1}
                         {this.props.field2}
                         {this.props.field3}
                         {this.props.field4}
                         {this.props.field5}
                         {this.props.field6}
                   </div>);
    }
}  

export default Resultrecords;
