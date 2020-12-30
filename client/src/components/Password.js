import React, { useState } from "react";
import { Form } from "react-bootstrap";

function Password(props) {
    const [password, setPassword] = useState(props.password)
    const [message, setMessage] = useState();
    const [retypepassword, setRetypepassword] = useState(props.password);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (name === "password") {
            setPassword(value)
        } else if (name === "retypepassword") {
            setRetypepassword(value);
            if (password !== retypepassword) {
                console.log(password,retypepassword)
           
            }
            else{
                console.log("match")
                setMessage("")
            }
        }
        if (password.match(passw) && password === retypepassword && password !=="" &&retypepassword !=="" ) {
            setMessage("")
            props.setPassword(password)
        }
        else {
            setMessage("Invalid Password entered - Please have Uppercase lowercase and numbers")
        }
    }


        return (<Form.Group>
            <Form.Text className="text-muted text-white bg-warning">{message}</Form.Text>
            <Form.Label  controlId="forPassword">
                Enter Password(Please note this down)</Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={handleInputChange}
                name="password"
                required />
            <Form.Label  controlId="forRetypepassword">
                Retype Password</Form.Label>
            <Form.Control
                type="password"
                value={retypepassword}
                onChange={handleInputChange}
                name="retypepassword"
                required />

        </Form.Group>)
}

export default Password;
