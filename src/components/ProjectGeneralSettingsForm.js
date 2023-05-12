import React, { Component } from 'react';
import './settings.css';

export default class ProjectGeneralSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
            projectVisibility: 'private',
            projectProcessTemplate: 'Agile',
            securityGroups: [],    
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                projectName: this.props.settings.projectName || '',
                projectDescription: this.props.settings.projectDescription || '',
                projectVisibility: this.props.settings.projectVisibility || 'private',
                projectProcessTemplate: this.props.settings.projectProcessTemplate || 'Agile',
                securityGroups: this.props.settings.securityGroups || []
            });
        }  
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onClickAddSecurityGroup = () => {
        const { securityGroups } = this.state;
        securityGroups.push({
            name: ''
        });
        this.setState({
            securityGroups: securityGroups
        });
    }
    onChangeSecurityGroupNameInput = (event) => {
        const target = event.target;
        const name = target.name;
        const { securityGroups } = this.state;
        const updatedSecurityGroups = [...securityGroups];
        updatedSecurityGroups[name].name = target.value;
        this.setState({
            securityGroups: updatedSecurityGroups
        });
    }
    onChangeSecurityGroupDescriptionInput = (event) => {
        const target = event.target;
        const name = target.name;
        const { securityGroups } = this.state;
        const updatedSecurityGroups = [...securityGroups];
        updatedSecurityGroups[name].description = target.description;
        this.setState({
            securityGroups: updatedSecurityGroups
        });
    }
    onClickRemoveSecurityGroup = (index) => {
        const { securityGroups } = this.state;
        securityGroups.splice(index, 1);
        this.setState({
            securityGroups: securityGroups
        });
    }
    render() {
        return (
            <div>
               <div className="mb-3">
                    <label className="form-label">Project name</label>
                    <input type="text" className="form-control" name="projectName" placeholder="LandingZone" value={this.state.projectNameName} onChange={this.onChangeInput} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Project description</label>
                    <textarea className="form-control" name="projectDescription" placeholder="LandingZone" value={this.state.projectDescription} onChange={this.onChangeInput} rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Process</label>
                    <select className="form-select" aria-label="Process" name="projectProcess" value={this.state.projectProcess} onChange={this.onChangeInput} >
                        <option value="basic">Basic</option>
                        <option value="agile">Agile</option>
                        <option value="scrum">Scrum</option>
                        <option value="cmmi">CMMI</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Visibility</label>
                    <select className="form-select" aria-label="Visibility" name="projectVisibility" value={this.state.projectVisibility} onChange={this.onChangeInput} >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Security groups</label><br/>
                    {this.state.securityGroups.map((securityGroup, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-5">
                                    <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="Connectivity approvers" value={securityGroup.name} onChange={this.onChangeSecurityGroupNameInput} />         
                                </div>
                                <div className="col-5">
                                    <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="Users who are allowed to approve the deployment of the Terraform configuration to the production environment" value={securityGroup.description} onChange={this.onChangeSecurityGroupDescriptionInput} />         
                                </div>
                                <div className="col-2">
                                    <button type="button" className="btn btn-danger" onClick={() => this.onClickRemoveSecurityGroup(index)}>Remove</button>
                                </div>
                            </div>     
                        )
                    })}
                    <button type="button" className="btn btn-secondary" onClick={() => this.onClickAddSecurityGroup()}>Add Security Group</button>        
                </div>
            </div>
        )
    }
}