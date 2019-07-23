import React,{ Component } from 'react';

class Resultrecords extends Component
{  
    render(){
            return(<div className="panel-body">
                        {/* <h4>{this.props.field1}</h4> */}
                         <h4 className="panel-heading centeralign">{this.props.field2}</h4>
                         <div className="row">
                         <ul className = "col-lg-6">
                         <li>{this.props.field3}</li>
                         <li>{this.props.field5}</li>
                         <li>{this.props.field7}</li>
                         </ul>
                         <ul className ="col-lg-6">
                         <li>{this.props.field4}</li>
                         <li>{this.props.field6}</li>
                         </ul> 
                         </div>
                   </div>);
    }
}  

export default Resultrecords;
