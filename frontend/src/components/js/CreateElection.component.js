import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import '../css/CreateElection.component.css';

import App from '../../App';

const candidateInput = (props) => (
    <div>
        <br /><label>Candidate 1</label>
        <td>
            <input type = "text"
                required
                className = "form-control"
                placeholder = "Candidate Name"
                name = "candidate"
            />
        </td>
    </div>
)

class CreateElection extends Component {
    constructor(props) {
        super(props);

        this.onChangeElectionName = this.onChangeElectionName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSDate = this.onChangeSDate.bind(this);
        this.onChangeEDate = this.onChangeEDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            electionname: '',
            description: '',
            sdate: new Date(),
            edate: new Date(),
            candidates: [] 
        }

        this.loadInstance();
        console.log(CreateElection.mainInstance)
    }

    async loadInstance() {
        var app = new App();
        CreateElection.mainInstance = await app.loadInstance();      
    }

    onChangeElectionName(e) {
        this.setState({
            electionname: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeSDate(date) {
        this.setState({
            sdate: date
        });
    }
    
    onChangeEDate(date) {
        this.setState({
            edate: date
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const electionDetails = {
            electionname: this.state.electionname,
            description: this.state.description,
            sdate: this.state.sdate,
            edate: this.state.edate,
            candidateObjects: document.getElementsByName("candidate").values(),
            candidates: []
        }

        var i = 0;

        for(var value of electionDetails.candidateObjects) {
            electionDetails.candidates[i] = value.value;
            i++;
        };


        await CreateElection.mainInstance.createElection(
            [electionDetails.electionname, electionDetails.description], 
            [1, 100], 
            electionDetails.candidates, 
            {from: this.props.account}
        )       
    
        window.location = '/dashboard';
    }

    render() {
        return(
            <div className = "container card">
                <h3>Create New Election</h3>
                
                <form onSubmit = {this.onSubmit}>
                    
                    <div className = "form-group">
                        <label>Name</label>
                        <input type = "text"
                            required
                            className = "form-control"
                            placeholder = "Enter election name"
                            onChange = {this.onChangeElectionName}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Description</label>
                        <textarea type = "text"
                            required
                            className = "form-control"
                            placeholder = "Describe your Election here"
                            onChange = {this.onChangeDescription}
                        ></textarea>
                    </div>

                    <table>

                        <tr>

                            <td id = "1" className = "form-group">
                                
                                <label>Candidate 1</label>
                                <td>
                                    <input type = "text"
                                        required
                                        className = "form-control"
                                        placeholder = "Candidate Name"
                                        name = "candidate"
                                    />
                                </td>

                                <br /><label>Candidate 2</label>
                                <td>
                                    <input type = "text"
                                        required
                                        className = "form-control"
                                        placeholder = "Candidate Name"
                                        name = "candidate"
                                    />
                                </td>

                                <td style = {{paddingLeft: 20}}>
                                    <button className = "btn btn-danger">+</button>
                                </td>
                            </td>

                        </tr>

                    </table>

                    <br/>

                    <div className = "grid-container">

                        <div className = "grid-item">
                            <label>Start Date</label>
                            <div>
                                <DatePicker
                                    required
                                    className = "form-control"
                                    selected = {this.state.sdate}
                                    onChange = {this.onChangeSDate}
                                />
                            </div>
                        </div>
                        
                        <div className = "grid-item">
                            <label>End Date</label>
                            <div>
                                <DatePicker
                                    required
                                    className = "form-control"
                                    selected = {this.state.edate}
                                    onChange = {this.onChangeEDate}
                                />
                            </div>
                        </div>

                    </div>

                    <br/>

                    <button className = "btn btn-success" type = "submit">
                        Submit
                    </button>

                </form>
            </div>
        )
    }
}

export default CreateElection;