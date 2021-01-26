import React from 'react';
import {Carousel,Container,  Card, ResponsiveEmbed} from "react-bootstrap";

const Alumni = () => {
    return(<Container>
    <h4 className="text-center">We are proud of our student's accomplishments</h4>
           <Carousel>
    
    
                <Carousel.Item interval={1000}>
                    {/* <Card.Img variant="top"
                        src="/images/helen.jpg"
                        alt="Helen" fluid /> */}
    
                    <Card.Body>
                   
              
                    <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/grad1.jpeg" />
                     </ResponsiveEmbed>
    
                        <Card.Title>
                           Intermediate Level Completion
                    
                        </Card.Title>
                      
                     </Card.Body>       
            </Carousel.Item>
    
            <Carousel.Item interval={1000}>
               
                <Card.Body>
                <ResponsiveEmbed aspectRatio="1by1">
                         <embed type="image/jpg" src="/images/grad2.jpeg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                        Advance level Completion
                    </Card.Title>
                   
                </Card.Body>
            </Carousel.Item>
    
            <Carousel.Item interval={500}>
            
                <Card.Body>
                <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/grad3.jpeg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                    Advance level Trophy handover
                    </Card.Title>
                  
                </Card.Body>
            </Carousel.Item>
            <Carousel.Item interval={500}>
    
                <Card.Body>
                <ResponsiveEmbed aspectRatio="16by9">
                         <embed type="image/jpg" src="/images/grad4.jpeg" />
                     </ResponsiveEmbed>
                    <Card.Title>
                  Advance level Trophy handover
                    </Card.Title>
                  
                    <br />
                </Card.Body>
    
            </Carousel.Item>
            <Carousel.Item interval={1000}>
            
            <Card.Body>
            <ResponsiveEmbed aspectRatio="1by1">
                     <embed type="image/jpg" src="/images/grad6.jpeg" />
                 </ResponsiveEmbed>
                <Card.Title>
                 Basic and Intermediate level students
                </Card.Title>
              
            </Card.Body>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
            
            <Card.Body>
            <ResponsiveEmbed aspectRatio="1by1">
                     <embed type="image/jpg" src="/images/grad7.jpeg" />
                 </ResponsiveEmbed>
                <Card.Title>
               Parents and Volunteers
                </Card.Title>
              
            </Card.Body>
        </Carousel.Item>
    
            </Carousel>
            
        </Container >);
        
    
   
} 

export default Alumni;
