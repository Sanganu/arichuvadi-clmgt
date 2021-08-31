import React from 'react';
import  { Container,Card, ResponsiveEmbed } from "react-bootstrap";
const Ourteam = () => {
    return (<Container  className="d-flex flex-wrap">
                <Card style={{ maxWidth: '20rem' }}>
                    <Card.Body>


                        <ResponsiveEmbed aspectRatio="1by1">
                            <embed type="image/gif" src="/images/helen.gif" />
                        </ResponsiveEmbed>

                        <Card.Title>
                            <h4>Helen</h4>
                            <h6>Board Member</h6>
                        </Card.Title>
                        <Card.Text>

                            Hi, I am Helen Samuel. I have been teaching Tamil in Arichuvadi
                        more than 11 years. Teaching is my passion. I have been working in public
                        school too. I have acted in Classical Tamil dramas. I also do anchoring in TAC,
                        I am known for comphering with classical style.
                        I am a very friendly person and loves to dress up in Indian attire.
                        I would make my at most attempts to pass on the tradition
                        and culture for future generations and there by nurture them to respect all culture and people.
                        Right now I am teaching students to take University Exams,
                        I feel as a great mile stone achieved in the growth of Arichuvdai.
                     </Card.Text>
                        <br />
                    </Card.Body>
                </Card>
                <Card style={{ maxWidth: '20rem' }}>
                    <Card.Body>
                        <ResponsiveEmbed aspectRatio="1by1">
                            <embed type="image/gif" src="/images/yamini.gif
                            " />
                        </ResponsiveEmbed>
                        <Card.Title>
                            <h4>Yamini</h4>
                            <h5 >Board Member</h5>
                        </Card.Title>
                        <Card.Text>
                            I'm with Arichuvadi and have been teaching here for about
                            10 years now. I have graduated a batch of students successfully from Basic, through
                            Intermediate and Advanced classes. Currently have taken upon
                            another batch and have moved on to intermediate with them. To
                            tell a little bit about myself. I have two boys Kavin and Kathir whose names we
                            mindfully chose to be in Tamil. Myself and my husband have been
                            passionate about teaching Tamil to our kids and found Arichuvadi as a great opportunity
                            to extend their knowledge into taking certification exams. I plan to stay
                            and enjoy my passion with Arichuvadi and help kids to learn the
                            language in the process.
                        </Card.Text>
                        <br />
                    </Card.Body>
                </Card>
                <Card style={{ maxWidth: '20rem' }}>

                    <Card.Body>
                        <ResponsiveEmbed aspectRatio="1by1">
                            <embed type="image/gif" src="/images/sangeetha.gif" />
                        </ResponsiveEmbed>
                        <Card.Title>
                            <h4>Sangeetha</h4>
                            <h5 className="card-title">Web Master</h5>
                        </Card.Title>
                        <Card.Text>
                            I was brought up in Chennai, I am a descendant of Saint.Ramalinga Vallalar, He is a fabulous
                            person who wrote Thiruarutpa. He is popular in Vadalur, Tamil Nadu. My gradfather was a sincere devotee and
                            he did his best to spread Arutpa. I had a regret, that I didn't contribute much to Tamil Language.
                            Hence when Yamini was discussing about the need for website, I stepped into Arichuvadi and contributed my sincere efforts
                            into developing this site from scratch. This is an ongoing process, we are just in the intial stages
                            and we hope to develop Arichuvadi and reach out to all Tamil speaking community across the globe.
                        </Card.Text>
                        <br />
                    </Card.Body>
                </Card>
                <Card style={{ maxWidth: '18rem' }}>
                    <Card.Body>
                        <ResponsiveEmbed aspectRatio="16by9">
                            <embed type="image/gif" src="/images/goldflowers.gif" />
                        </ResponsiveEmbed>
                        <Card.Title>
                            <h4 className="card-title">Anou</h4>
                            <h5 className="card-title">Board Member</h5>
                        </Card.Title>
                        <Card.Text>
                            I am the founder of Arichuvadi.
        
                <a className="btn btn-primary" href="https://www.facebook.com/anou.mana">Facebook</a>
                            <a className="btn" href="https://www.linkedin.com/in/anou-manavalan/">Linked In</a>
                        </Card.Text>
                        <br />
                    </Card.Body>
                </Card>
                <Card style={{ maxWidth: '18rem' }}>
                    <Card.Body>
                        <ResponsiveEmbed aspectRatio="16by9">
                            <embed type="image/gif" src="/images/grey.gif" />
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
                </Card>
            </Container >);
        }
        
        export default Ourteam;
