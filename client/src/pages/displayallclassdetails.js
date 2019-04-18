import React, { Component } from 'react';



class Allclasses extends Component {
    

      render() {
            const classrec = this.props.classrecs || [{"lesson":"No class details exist","homework":"N/A"}];
            return (<tbody>
                      {classrec.map((data, index) =>
                              <tr key={index}>
                                    <td className="col-lg-4">{data.lesson}</td>
                                    <td className="col-lg-4">{data.homework}</td>
                                    <td className="col-lg-4">{data.classdate ? data.classdate.substr(0, 10) : " "}</td>
                              </tr>
                      )}
            </tbody>
            ); // end return

      }
}
export default Allclasses;


