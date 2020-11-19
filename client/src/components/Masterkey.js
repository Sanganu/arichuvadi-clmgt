import React, { Component } from 'react';

class Masterkey extends Component {
    state = {
        masterID: this.props.Id || ""
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('The Value in input change',value,name);

        this.setState({
           masterID:value
        });
        this.props.passMasterId(value)
    };

    render() {
        return (<React.Fragment>
            <select className="form-control droplist" onChange={this.handleInputChange} name="masterKey" value={this.state.masterID}>
                {this.props.items.map((rec, key) =>
                    <option value={rec._id}>{rec.fname + " " + rec.lname}</option>)}
            </select>
        </React.Fragment>)
    }
}

export default Masterkey;
