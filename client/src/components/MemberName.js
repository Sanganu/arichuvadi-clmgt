import React, { useState } from "react";
import { Form, Row, Col} from "react-bootstrap";

function MemberName(props) {
  const [firstname, setFirstName] = useState(props.firstName);
  const [lastname, setLastName] = useState(props.lastName);
  const [fmessage, setFMessage] = useState();
  const [lmessage,setLMessage] = useState();

  function handleInputChange(event) {
    const field = event.target.name;
    const nametext = event.target.value;
    var letters = /^[A-Za-z]+$/;

    if (nametext.match(letters)) {
      setLMessage("")
      setFMessage("")
      if (field === "firstname") {
        setFirstName(nametext)
        props.setName(props.name+"fname",nametext)
      } else if (field === "lastname") {
        setLastName(nametext)
        props.setName(props.name+"lname",nametext)
      }
      

    }
    else {
      if (field === "firstname") {
        setFMessage("Enter Valid Name - Only Text")
      } else if (field === "lastname") {
        setLMessage("Enter Valid Name - Only Text")
      }
   
    }

  }

  return (<React.Fragment>
    <Row>
     <Col>
    <Form.Group >
   
      <Form.Label>{props.name + "'s  First Name:"}</Form.Label>
      <Form.Text className="text-muted text-danger m-1 p-2">{fmessage}</Form.Text>
      <Form.Control type="text" value={firstname} onChange={handleInputChange} required name="firstname" />
    </Form.Group>
    </Col>
    <Col>
    <Form.Group>
      <Form.Label>{props.name + "'s  Last Name:"} </Form.Label>
      <Form.Text className="text-muted text-red m-1 p-2">{lmessage}</Form.Text>
      <Form.Control type="text" value={lastname} onChange={handleInputChange} required name="lastname"  />
    </Form.Group>
    </Col>
    </Row>
  </React.Fragment>)
}

export default MemberName;
