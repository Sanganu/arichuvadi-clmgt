import React,{ Component } from 'react';
//This is display of all studnets under student management

class Allstudents extends Component
{
    state = {
        stdfname : this.props.stdfname || '',
        stdlname : this.props.stdlname || '',
        stdemail : this.props.stdemail || '',
        parentname : this.props.parentname || '',
        phonenumber :  this.props.phonenumber || '',
        levelcompleted:this.props.levelcompleted || '',
        levelrequested:this.props.levelrequested || '',
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
           levelcompleted: this.state.levelcompleted,
           levelrequested: this.state.levelrequested
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
                       {/* <td><input type="text" value={this.state.levelcompleted} onChange={this.handleInputChange} name="levelcompleted" /></td>
                       <td><input type="text" value={this.state.levelrequested} onChange={this.handleInputChange} name="levelrequested" /></td>
                       <div className="form-group row"> */}
                            {/* <label className="has-float-label">Completed Level : </label> */}
                          <td>  <select className="form-control droplist" value={this.state.levelcompleted} onChange={this.handleInputChange} name="levelcompleted" >
                          <option value='Beginner-Oral'>Beginner-Oral</option>
                            <option value='Beginner-Visual'>Beginner-Visual</option>
                            <option value='Beginner-Written'>Beginner-Written</option>
                    
                            <option value='Intermediate-Oral'>Intermediate</option>

                            <option value='Intermediate-Visual'>Intermediate</option>
                    
                            <option value='Intermediate-Written'>Intermediate</option>
                    
                            <option value='Advance-Oral'>Advance</option>
                            <option value='Advance-Visual'>Advance</option>
                            <option value='Advance-Written'>Advance</option>
                    
                            </select></td>
                        {/* </div> */}
                        {/* <div className="form-group row"> */}
                            {/* <label className="has-float-label">Requesting Course : </label> */}
                           <td> <select className="form-control droplist"
                            onChange={this.handleInputChange}
                            value={this.state.levelrequested} 
                            name="levelrequested" >
                            <option value='Beginner-Oral'>Beginner-Oral</option>
                            <option value='Beginner-Visual'>Beginner-Visual</option>
                            <option value='Beginner-Written'>Beginner-Written</option>
                    
                            <option value='Intermediate-Oral'>Intermediate</option>

                            <option value='Intermediate-Visual'>Intermediate</option>
                    
                            <option value='Intermediate-Written'>Intermediate</option>
                    
                            <option value='Advance-Oral'>Advance</option>
                            <option value='Advance-Visual'>Advance</option>
                            <option value='Advance-Written'>Advance</option>
                            </select></td>
                        {/* </div> */}
                       <td><button className = "rowbtn" onClick ={this.updateStudent}><i className="fa fa-edit fa-lg"></i></button></td>
                       <td><button  className = "rowbtn" onClick = {this.deleteStudent}><i className="fa fa-trash fa-lg"></i></button></td>
                    </tr>
               );
    }   
}

export default Allstudents;