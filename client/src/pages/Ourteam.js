import React from 'react';

const Ourteam = () => {
    return (<div>

        <div id="multi-item-example" className="carousel slide carousel-multi-item" data-ride="carousel">

            
            <ol className="carousel-indicators">
                <li data-target="#multi-item-example" data-slide-to="0" className="active"></li>
                <li data-target="#multi-item-example" data-slide-to="1"></li>
                <li data-target="#multi-item-example" data-slide-to="2"></li>
                <li data-target="#multi-item-example" data-slide-to="3"></li>
            </ol>
            <div className="carousel-inner" role="listbox">

                   <div className="carousel-item active">
                        <div className="card mb-3">
                              <div className="row no-gutters">
                                    <div className="col-md-4">       
                                    <img className="card-img-top ourteam"
                                        src="/images/goldflowers.jpg"
                                        alt="Card image cap"/>
                                    </div>
                                    <div className="col-md-8">    
                                        <div className="card-body">
                                            <h4 className="card-title">Anou</h4>
                                            <h5>Board Member</h5>
                                            <p className="card-text">
                                           I am the founder of Arichuvadi.
                                            </p>
                                            <a className="btn btn-primary">Button</a>
                                        </div>
                                    </div>
                                </div>      
                            </div>
                       </div>
                <div className="carousel-item">
                     <div className="card mb-3">
                        <div className = "row no-gutters">
                           <div class="col-md-4">
                               <img className="card-img-top ourteam"
                                src="/images/helen.jpeg"
                                alt="Card image cap"/>
                            </div>
                            <div class="col-md-8" >   
                                <div className="card-body">
                                    <h4 className="card-title">Helen</h4>
                                    <h5>Board Member</h5>
                                    <p className="card-text">
                                    Hi, I am Helen. I have been teaching Tamil in Arichuvadi
                                    more than 11 years. Teaching is my passion. I have been working in public
                                    school too. I have acted in Tamil dramas. I am so happy that 
                                    I get a very good opputunity to teach Tamil and have the kids
                                    to take University Exams.
                                    </p>
                                    <a className="btn btn-primary">Button</a>
                                </div>
                            </div>   
                        </div>    
                     </div>
                 </div>

                        <div className="carousel-item">
                            <div className="card mb-3">
                              <div className="row no-gutters">
                                <div className="col-md-4">       
                                  <img className="card-img-top ourteam"
                                    src="/images/yamini.jpeg"
                                    alt="Card image cap"/>
                                </div>
                                <div className="col-md-8">    
                                    <div className="card-body">
                                        <h4 className="card-title">Yamini</h4>
                                        <h5>Board Member</h5>
                                        <p className="card-text">
                                        I'm with Arichuvadi and have been teaching here for about
                                        10 years now. I have graduated a batch of students successfully from Basic, through
                                        Intermediate and Advanced classes. Currently have taken upon
                                        another batch and have moved on to intermediate with them. To
                                        tell a little bit about myself. I have two boys Kavin and Kathir whose names we
                                        mindfully chose to be in Tamil. Myself and my husband have been
                                        passionate about teaching Tamil to our kids and found Arichuvadi as a great oppurtunity
                                        to extend their knowledge into taking certificate exams. I plan to stay
                                        and enjoy my passion with Arichuvadi and help kids to learn the 
                                        language in the process.
                                        </p>
                                        <a className="btn btn-primary">Button</a>
                                    </div>
                                </div>
                              </div>      
                            </div>
                        </div>
               
                        <div className="carousel-item">
                            <div className="card mb-3">
                              <div className="row no-gutters">
                                <div className="col-md-4">       
                                  <img className="card-img-top ourteam"
                                    src="/images/colors_1.jpg"
                                    alt="Card image cap"/>
                                </div>
                                <div className="col-md-8">    
                                    <div className="card-body">
                                        <h4 className="card-title">Chitra</h4>
                                        <h5>Board Member</h5>
                                        <p className="card-text">
                                       I teach small kids insisting on handwritting 
                                        </p>
                                        <a className="btn btn-primary">Button</a>
                                    </div>
                                </div>
                              </div>      
                            </div>
                        </div>
            </div>

        </div>
        
    </div>);
}                       
                                
export default Ourteam;
