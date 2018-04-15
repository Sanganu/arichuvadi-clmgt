import React,{ Component } from 'react';


class Allclasses extends Component
{
   state = {

   }
  //axios.get('/api/teachers/')
  componentDidMount = () => {
    console.log("all class =Inside component did mount before placing the axios call");


  } // end component did mount


    render()
    {
      const classrec = this.props.classrecords;
      return(<div>
                    <h6 className ="tablehead">Class Details </h6>
                    <div className = "table-responsive">
                          <table className = "table table-hover">
                          <tbody>
                                 {classrec.map((data,index) =>
                                  <tr key={index}>
                                         <td>{data.homework}</td>
                                         <td>{data.lesson}</td>
                                          <td>{data.present}</td>
                                  </tr>
                                )}
                           </tbody>
                          </table>
                    </div>
            </div>); // end return
      } // end render
} //end allbatches
export default Allclasses;

/*
<button className ="btn btn-large-info" id = "blogin" onClick={this.onClassclick}>Add Class Details</button>
{this.displayclass ? <Addclassdetails btrecs = {this.state.batchrecords}/> :<div></div>}
*/
