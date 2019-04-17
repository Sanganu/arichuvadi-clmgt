import React, { Component } from 'react';



class Allclasses extends Component {
      // deleteClass = (classid) =>{
      //       console.log("Delete-child",classid);
      // }

      render() {
            const classrec = this.props.classrecords || [{"lesson":"No class Details Exist","Homework":"N/A"}];
            return (<tbody>
                      {classrec.map((data, index) =>
                              <tr key={index}>
                                    <td>{data.lesson}</td>
                                    <td>{data.homework}</td>
                                    <td>{data.classdate ? data.classdate.substr(0, 10) : " "}</td>
                              </tr>
                      )}
            </tbody>
            ); // end return

      }
}
export default Allclasses;


