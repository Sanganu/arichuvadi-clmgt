import React,{ Component} from 'react';



class Allclasses extends Component{
      render()
      {
            const classrec = this.props.classrecs || ["No class Details Exist"];
            return( classrec.map((data,index) =>
                                    <tr key={index}>
                                          <td>{data.lessoncov}</td>
                                          <td>{data.homework}</td>
                                          <td>{data.cldate}</td>
                                    </tr>
                                    )
            ); // end return
            
      }
}      
export default Allclasses;


