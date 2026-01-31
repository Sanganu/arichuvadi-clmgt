import React from "react";
import { Form } from "react-bootstrap";

function Phone() {
    const [cell, setCellPhone] = useState(props.phone)
    const [message,setMessage] = useState();
    const handleInputChange = (event) => {
        const value = event.target.value;
        setCellPhone(value)
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (cell.match(phoneno)) {
           props.setCell(cell)
        }
        else {
            setMessage("Enter Valid Email example:name@example.com")
       
        }

    }
    return (<Form.Group controlId="formPhone">
        <Form.Label>
            Phone</Form.Label>
        <Form.Text className="text-muted text-danger m-3 p-3">{message}</Form.Text>
        <Form.Control
            type="phone"
            placeholder="111-111-1111"
            value={cell}
            onChange={handleInputChange}
            name="loginemail"
             required />
    </Form.Group>)
}


export default Phone;
