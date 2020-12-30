import React from "react";
import { Form } from "react-bootstrap";

function Phone() {
    const [cell, setCellPhone] = useState(props.phone)
    const handleInputChange = (event) => {
        const value = event.target.value;
        setCellPhone(value)
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (cell.match(phoneno)) {
            return true;
        }
        else {

            return false;
        }

    }
    return (<Form.Group controlId="formPhone">
        <Form.Label>
            Phone</Form.Label>
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
