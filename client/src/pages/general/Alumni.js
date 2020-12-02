import React from 'react';
import {Accordion, Card} from "react-bootstrap";

const Alumni = () => {
    return(<Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle  variant="link" eventKey="0">
           Cohort - , Level - ,Graduation 
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Pics to be uploaded soon</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle variant="link" eventKey="1">
            Cohort - , Level - ,Graduation 
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Pics to be uploaded soon</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>);
} 

export default Alumni;
