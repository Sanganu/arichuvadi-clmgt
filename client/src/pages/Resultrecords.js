import React,{ Component } from 'react';

class Resultrecords extends Component
{  
    render()
    {
         
            return(<div>
                         {this.props.recbatchid}
                         {this.props.reclogin}
                         {this.props.recparent}
                         {this.props.recphone}
                         {this.props.recstudent}  
                        
                         <button onClick ={this.props.detailsdisplay} />
                   </div>);
    }
}  

export default Resultrecords;
