import React, { Component } from 'react';



class Allclasses extends Component {
      // deleteClass = (classid) =>{
      //       console.log("Delete-child",classid);
      // }

      render() {
            const classrec = this.props.classrecords || [{"lesson":"No class Details Exist","Homework":"N/A"}];
            return (<div className="row">
                  {/* <table> 
                        <thead>
                              <tr>
                                    <th>Lesson</th>
                                    <th>Homework</th>
                                    <th>Date</th>
                              </tr>
                        </thead>
                        <tbody> */}
                              {classrec.map((data, index) =>
                              <tr key={index}>
                                    <td>{data.lesson}</td>
                                    <td>{data.homework}</td>
                                    <td>{data.classdate ? data.classdate.substr(0, 10) : " "}</td>
                                    {/* <td><button onClick={() => this.deleteClass(data.clid)}
                              className="rowbtn">
                              <i className="fa fa-trash"></i>
                        </button></td> */}
                              </tr>
                              )}
                  {/* </tbody>
                  </table> */}
            </div>
            ); // end return

      }
}
export default Allclasses;


