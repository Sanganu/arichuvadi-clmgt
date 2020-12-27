import React, { useState } from "react";
import { Form } from "react-bootstrap";

function MemberName(props) {
  const [firstname, setFirstName] = useState(props.firstName);
  const [lastname, setLastName] = useState(props.lastName);
  const [message, setMessage] = useState();

  function handleInputChange (event) {
    const field = event.target.name;
    const nametext = event.target.value;
    var letters = /^[A-Za-z]+$/;

    if (nametext.match(letters)) {
      setMessage("")
      if (field === "firstname") {
        setFirstName(nametext)
      } else if (field === "lastname") {
        setLastName(nametext)
      }
      if (firstname.length > 2 && lastname.length > 2) {
        props.setName(firstname, lastname)
      }


    }
    else {
      setMessage("Enter Valid Name")
    }

  }

  return (<React.Fragment>

    <Form.Group controlID="formText">
      <Form.Text className="text-muted text-white bg-warning m-1 p-1">{message}</Form.Text>
      <Form.Label>{props.name}</Form.Label>
      <Form.Control type="text" value={firstname} onChange={this.handleInputChange} required name="firstname" />
    </Form.Group>
    <Form.Group controlID="formText">
      <Form.Text className="text-muted text-white bg-warning m-1 p-1">{message}</Form.Text>
      <Form.Label>{props.name}</Form.Label>
      <Form.Control type="text" value={lastname} onChange={this.handleInputChange} required name="lastname" />
    </Form.Group>
  </React.Fragment>)
}

export default MemberName;
