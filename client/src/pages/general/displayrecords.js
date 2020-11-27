import React from 'react';



const Allrecords =(props) => {
            return (<tr key={props.index}>
                                    <td>{props.field1}</td>
                                    <td></td>
                                    <td>{props.field2}</td>
                                    <td></td>
                                    <td>{props.field3 ? props.field3.substr(0, 10): ''}</td>
                     </tr>
                     ); // end return

      }



export default Allrecords;
