import React from 'react';
import {Carousel,Container, Card, ResponsiveEmbed} from "react-bootstrap";

const Alumni = () => {
    return(<Container>
    
           <Carousel>
    
    
                <Carousel.Item interval={1000}>
                    {/* <Card.Img variant="top"
                        src="/images/helen.jpg"
                        alt="Helen" fluid /> */}
    
                    <Card.Body>
                   
              
                    <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/helen.jpg" />
                     </ResponsiveEmbed>
    
                        <Card.Title>
                            <h4>Helen</h4>
                            <h6>Board Member</h6>
                        </Card.Title>
                      
                     </Card.Body>       
            </Carousel.Item>
    
            <Carousel.Item interval={1000}>
               
                <Card.Body>
                <ResponsiveEmbed aspectRatio="1by1">
                         <embed type="image/jpg" src="/images/yamini.jpg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                        <h4>Yamini</h4>
                        <h5 >Board Member</h5>
                    </Card.Title>
                   
                </Card.Body>
            </Carousel.Item>
    
            <Carousel.Item interval={500}>
            
                <Card.Body>
                <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/grey.jpg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                    <h4>Chitra</h4>
                    <h5 className="card-title">Board Member</h5>
                    </Card.Title>
                    <Card.Text>
                        I teach small kids insisting on handwritting
                     </Card.Text>
                     <br />
                </Card.Body>
            </Carousel.Item>
            <Carousel.Item interval={500}>
    
                <Card.Body>
                <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/goldflowers.jpg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                    <h4 className="card-title">Anou</h4>
                    <h5 className="card-title">Board Member</h5>
                    </Card.Title>
                  
                    <br />
                </Card.Body>
    
            </Carousel.Item>
            <Carousel.Item interval={1000}>
            
            <Card.Body>
            <ResponsiveEmbed aspectRatio="1by1">
                     <embed type="image/jpg" src="/images/SangeethaK.jpg" />
                 </ResponsiveEmbed>
                <Card.Title>
                <h4>Sangeetha</h4>
                <h5 className="card-title">Web Master</h5>
                </Card.Title>
              
            </Card.Body>
        </Carousel.Item>
    
            </Carousel>
            
        </Container >);
        
    
   
} 

export default Alumni;
