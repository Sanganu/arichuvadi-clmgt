import React from 'react';
import {Carousel,Container, Card, ResponsiveEmbed} from "react-bootstrap";

const Alumni = () => {
    return(<Container>
    <h1>We are proud of our stuents</h1>
           <Carousel>
    
    
                <Carousel.Item interval={1000}>
                    {/* <Card.Img variant="top"
                        src="/images/helen.jpg"
                        alt="Helen" fluid /> */}
    
                    <Card.Body>
                   
              
                    <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/grad1.jpg" />
                     </ResponsiveEmbed>
    
                        <Card.Title>
                            Advance Level Completion
                    
                        </Card.Title>
                      
                     </Card.Body>       
            </Carousel.Item>
    
            <Carousel.Item interval={1000}>
               
                <Card.Body>
                <ResponsiveEmbed aspectRatio="1by1">
                         <embed type="image/jpg" src="/images/grad2.jpg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                        Basic Course
                    </Card.Title>
                   
                </Card.Body>
            </Carousel.Item>
    
            <Carousel.Item interval={500}>
            
                <Card.Body>
                <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/gre.jpg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                    Chitra
              
                    </Card.Title>
                  
                </Card.Body>
            </Carousel.Item>
            <Carousel.Item interval={500}>
    
                <Card.Body>
                <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/goldflowers.jpg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                      Gradutaion  celebration
           
                    </Card.Title>
                  
                    <br />
                </Card.Body>
    
            </Carousel.Item>
            <Carousel.Item interval={1000}>
            
            <Card.Body>
            <ResponsiveEmbed aspectRatio="1by1">
                     <embed type="image/jpg" src="/images/S.jpg" />
                 </ResponsiveEmbed>
                <Card.Title>
             Students
                </Card.Title>
              
            </Card.Body>
        </Carousel.Item>
    
            </Carousel>
            
        </Container >);
        
    
   
} 

export default Alumni;
