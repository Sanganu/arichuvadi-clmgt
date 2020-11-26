import React,{useState} from "react";
import {Modal } from "react-bootstrap";
import {Button} from "react-bootstrap";
import MasterKey from "../../components/Masterkey";

const AddModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <React.Fragment>
        <Button variant="primary" onClick={handleShow}>
         {props.Title}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <MasterKey
            IdType={props.IdType}
            passMasterId={props.handleNewStudent}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
}   

export default AddModal;
