import React,{ Component } from 'react';

class Allstudents extends Component
{
    state = {
        stdfname : this.props.stdfname || '',
        stdlname : this.props.stdlname || '',
        stdemail : this.props.stdemail || '',
        parentname : this.props.parentname || '',
        phonenumber :  this.props.phonenumber || '',
        display: true
    }

    deleteStudent = () =>{
         console.log("Delete-child");
         this.setState({display : false});
         this.props.deleteStudentDetails(this.props.stdid);
    }

    updateStudent = () =>{
        console.log("Update Student");
        let stdrecord = {
            recid: this.props.stdid,
            stdfname : this.state.stdfname,
            stdlname : this.state.stdlname,
            stdemail : this.state.stdemail,
            parentname : this.state.parentname,
            phonenumber : this.state.phonenumber,
            noofbatches: this.props.noofbatches
        }
        this.props.updateStudentDetails(stdrecord);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value =  target.value;
        const name =  target.name;
          
        this.setState({
           [name]: value
         } /*,
         () =>{
           console.log('Set State in Main Section',value,name);
         } */);
      };
  
    render()
    {
            return(                
                   <tr className = "addclass"><td><input type="text" value={this.state.stdfname} onChange={this.handleInputChange} name= "stdfname" /></td>
                       <td><input type="text" value={this.state.stdlname} onChange={this.handleInputChange} name = "stdlname"/></td>
                       <td><input type="text" value={this.state.stdemail} onChange={this.handleInputChange} name="stdemail" /></td>
                       <td><input type="text" value={this.state.parentname} onChange={this.handleInputChange} name="parentname"/></td>
                       <td><input type="text" value={this.state.phonenumber} onChange={this.handleInputChange} name="phonenumber" /></td>
                       <td><button className = "rowbtn" onClick ={this.updateStudent}><i className="fa fa-edit fa-lg"></i></button></td>
                       {/* <td><button  className = "rowbtn" onClick = {this.deleteStudent}><i className="fa fa-trash fa-lg"></i></button></td> */}
                    </tr>
               );
    }   
}

export default Allstudents;