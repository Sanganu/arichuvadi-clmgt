import React,{ Component} from 'react';



class Allclasses extends Component{
      render()
      {
            const classrec = this.props.classrecs || ["No class Details Exist"];
            return( classrec.map((data,index) =>
                                    <tr key={index}>
                                          <td>{data.homework}</td>
                                          <td>{data.lesson}</td>
                                          
                                    </tr>
                                    )
            ); // end return
            
      }
}      
export default Allclasses;


