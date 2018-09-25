import React from 'react';


const Allclasses =(props) =>
{
      const classrec = props.classrecords || [];
      return( classrec.map((data,index) =>
                                  <tr key={index}>
                                         <td>{data.homework}</td>
                                         <td>{data.lesson}</td>
                                          <td>{data.present}</td>
                                  </tr>
                                )
      ); // end return
}
export default Allclasses;


