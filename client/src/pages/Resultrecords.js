import React,{ Component } from 'react';

class Resultrecords extends Component
{  
    render()
    {
            
            return(<div>
                        {/* <h4>{this.props.field1}</h4> */}
                         <h4>{this.props.field2}</h4>
                         <p>{this.props.field3}</p>
                         <p>{this.props.field4}</p>
                         <p>{this.props.field5}</p>
                         <p>{this.props.field6}</p>
                   </div>);
    }
}  

export default Resultrecords;
