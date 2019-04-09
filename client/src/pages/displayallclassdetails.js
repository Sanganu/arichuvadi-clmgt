import React, { Component } from 'react';



class Allclasses extends Component {
      // deleteClass = (classid) =>{
      //       console.log("Delete-child",classid);
      // }

      render() {
            const classrec = this.props.classrecs || ["No class Details Exist"];
            return (classrec.map((data, index) =>
                  <tr key={index}>
                        <td>{data.lessoncov}</td>
                        <td>{data.homework}</td>
                        <td>{data.cldate ? data.cldate.substr(0,10): " "}</td>
                        {/* <td><button onClick={() => this.deleteClass(data.clid)}
                              className="rowbtn">
                              <i className="fa fa-trash"></i>
                        </button></td> */}
                  </tr>
            )
            ); // end return

      }
}
export default Allclasses;


