import React, { useState } from "react";
import { Form, Row, Col} from "react-bootstrap";

function MemberName(props) {
 // const [field1_name, setFirstField] = useState(props.field1_name);
  //const [field2_name, setSecondField] = useState(props.field2_name);
  const [fmessage, setFMessage] = useState("");
  const [lmessage,setLMessage] = useState("");
  
  // function handleInputChange(event) {
  //   const field = event.target.name;
  //   const nametext = event.target.value;
  //   var letters = /^[A-Za-z]+$/;
    
  //   console.log("member name",props)
  //   if (nametext.match(letters)) {
  //     setLMessage("")
  //     setFMessage("")
  //     if (field === "firstname") {
  //       setFirstName(nametext)
  //       props.setName(props.name+"fname",nametext)
  //     } else if (field === "lastname") {
  //       setLastName(nametext)
  //       props.setName(props.name+"lname",nametext)
  //     }
  //   }
  //   else {
  //     if (field === "firstname") {
  //       setFMessage("Enter Valid Name - Only Text")
  //     } else if (field === "lastname") {
  //       setLMessage("Enter Valid Name - Only Text")
  //     }
   
  //   }

  // }

  function handleInputChange(event) {
    const field = event.target.name;
    const nametext = event.target.value;
    var letters = /^[A-Za-z]+$/;
    if (nametext.match(letters)) {
      setLMessage("")
      setFMessage("")
      if (field === "field_1") {
        props.setFirstField(nametext)
      } else if (field === "field_2") {
        props.setSecondField(nametext)
      }
    }
    else {
      if (field === "field_1") {
        setFMessage("Enter Valid Name value - Only Text")
      } else if (field === "field_2") {
        setLMessage("Enter Valid Name value  - Only Text")
      }
    }
  }

  return (<React.Fragment>
    <Row>
     <Col>
    <Form.Group >
      <Form.Label>{props.field_1}</Form.Label>
      <Form.Text className="text-muted text-danger m-1 p-2">{fmessage}</Form.Text>
      <Form.Control type="text" value={props.field1_name} onChange={handleInputChange} required name="field_1" />
    </Form.Group>
    </Col>
    <Col>
    <Form.Group>
      <Form.Label>{props.field_2}</Form.Label>
      <Form.Text className="text-muted text-red m-1 p-2">{lmessage}</Form.Text>
      <Form.Control type="text" value={props.field2_name} onChange={handleInputChange} required name="field_2"  />
    </Form.Group>
    </Col>
    </Row>
  </React.Fragment>)
}

export default MemberName;
