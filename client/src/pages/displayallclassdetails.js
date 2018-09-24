import React from 'react';


const Allclasses =(props) =>
{
      const classrec = props.classrecords || [];
      return(
            //  <div>
            //         <h6 className ="tablehead">Class Details </h6>
            //         <div className = "table-responsive">
            //               <table className = "table table-hover">
            //               <tbody>
                                 classrec.map((data,index) =>
                                  <tr key={index}>
                                         <td>{data.homework}</td>
                                         <td>{data.lesson}</td>
                                          <td>{data.present}</td>
                                  </tr>
                                )
            //                </tbody>
            //               </table>
            //          </div>
            // </div>  
      ); // end return

}
export default Allclasses;


