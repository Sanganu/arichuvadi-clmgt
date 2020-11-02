import React, { Component } from 'react';
import axios from 'axios';
import Resultrecords from './Resultrecords';


class Searchstudents extends Component {

    state = {
        searchstring: '',
        results: [{}],
        foundrecords: false,
        displaymessage: false,
        records: [{}]
    }

    searchrecords = (event) => {
        event.preventDefault();
        console.log("BEfore axios call - search str", this.state.searchstring)
        axios.get(`/api/teacher/search/${this.state.searchstring}`)
            .then((response) => {
                console.log("Results from search", response);
                let matchrecords = [];
                let found = false;
                let displaymessage = false;
                if ((response.data.studentdetails.length > 0) ||
                    (response.data.batchdetails.length > 0)) {
                    found = true;
                    displaymessage = false;
                   // console.log("if statement");
                    for (let i = 0; i < response.data.studentdetails.length; i++) {

                        let currentrec = {
                            field1: response.data.studentdetails[i]._id,
                            field2: "Student: " + response.data.studentdetails[i].studentfname + " " + response.data.studentdetails[i].studentlname,
                            field3: "Username: "+ response.data.studentdetails[i].loginemail,
                            field4: "Parent: " + response.data.studentdetails[i].parentname,
                            field5: "Telephone: " + response.data.studentdetails[i].parentphonenumber,
                            field6: "Batch: " + response.data.studentdetails[i].batchdesc,
                            field7:""
                        }
                        matchrecords.push(currentrec)
                    }
                    for (let i = 0; i < response.data.batchdetails.length; i++) {

                        let currentrec = {
                            field1: response.data.batchdetails[i]._id,
                            field2: "Batch: " + response.data.batchdetails[i].batchdesc,
                            field3: "Course: "+response.data.batchdetails[i].course,
                            field4: "Level: " + response.data.batchdetails[i].level,
                            field5: "Teacher: "+ response.data.batchdetails[i].teacher,
                            field6: "Number of Students: " + response.data.batchdetails[i].students.length,
                            field7: "Classes: "+response.data.batchdetails[i].classid.length
                        }
                        matchrecords.push(currentrec)
                    } // end for
                } // end if
                else {
                    displaymessage = true
                    found = false;
                } //end else
                this.setState({
                    results: matchrecords,
                    foundrecords: found,
                    displaymessage: displaymessage
                },
                    () => {
                        console.log("State", this.state.results, 'found', this.state.foundrecords);
                    });
            })
            .catch((err) => {
                console.log("The error:", err);
            });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //console.log('The Value in input change',value,name);

        this.setState({
            [name]: value
        });
    };

    render() {
        let resultset = this.state.results

        return (<div>
                   <form className="inputsection">
                        <h5 className="subhead">Search Student / Cohort</h5>
                            <div className="form-group row">
                                <label className="has-float-label"id="lsearchstr">Search </label><br />
                                <input className="form-control" onChange={this.handleInputChange} type="text" name="searchstring" value={this.state.searchstring} /><br />.
                            </div>
                            <button className="createbutton" name="searchbtn" onClick={this.searchrecords}>Search</button>
                    </form>
                    {resultset.length > 0 ?
                    <div className="panel-group">
                          <div className = "panel panel-primary">
                            <div>{resultset.map((data, index) =>
                                <Resultrecords field1={data.field1}
                                    key={index}
                                    field2={data.field2}
                                    field3={data.field3}
                                    field4={data.field4}
                                    field5={data.field5}
                                    field6={data.field6}
                                    field7={data.field7}
                                />)}
                            </div> 
                         </div>
                   </div>  
                : <div></div>}        
                {this.state.displaymessage ?
                             <div><h3 className = "searcherrmsg">   No Student / Cohort details found</h3></div>
                   : <div></div>}
              </div>);
         }
                
     }
    
    export default Searchstudents;
            
  