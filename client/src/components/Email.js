import React, {useState} from "react";
import {Form} from "react-bootstrap";

function Email(props){
    const [loginemail,setEmail]=useState(props.email)
    const [message,setMessage] = useState();

    const handleInputChange = (event) => {
        const value = event.target.value;
        setEmail(value)
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
           setMessage("")
           props.setEmail(loginemail)
        }
        else{
           setMessage("Enter Valid Email example:name@example.com")
        
        }

    };

    return( <Form.Group controlId="formEmail">
    <Form.Text className="text-muted text-white bg-warning">{message}</Form.Text>
    <Form.Label>
      Login Email</Form.Label>
    <Form.Control
       type="email"
      placeholder="name@example.com"
      value={loginemail}
      onChange={handleInputChange}
      name="loginemail"
      id="loginemail"
      required />
      <Form.Text className="text-muted">
      We'll never share your email with anyone else.
      </Form.Text>
  </Form.Group>

    )
}

export default Email;
