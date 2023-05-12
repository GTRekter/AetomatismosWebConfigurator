import React, { Component } from 'react';
import './settings.css';

export default class OrganizationGeneralSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetOrganizationName: '',
            connectToAzureActiveDirectory: false,
            tenantId: '',
            usersToAddToOrganiation: '',
            extensionsToAddToOrganiation: ''
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                targetOrganizationName: this.props.settings.targetOrganizationName || '',
                connectToAzureActiveDirectory: this.props.settings.connectToAzureActiveDirectory || false,
                tenantId: this.props.settings.tenantId || '',
                usersToAddToOrganiation: this.props.settings.usersToAddToOrganiation || '',
                extensionsToAddToOrganiation: this.props.settings.extensionsToAddToOrganiation || ''
            });
        }  
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        },() => {
            this.props.onUpdate(this.state);
        });
    };
    render() {
        return (
            <div>
                <div className="mb-3">
                    <label className="form-label">Target organization name</label>
                    <input type="text" className="form-control" name="targetOrganizationName" placeholder="microsoft" value={this.state.targetOrganizationName} onChange={this.onChangeInput} />
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" id="connectToAzureActiveDirectory" name="connectToAzureActiveDirectory" checked={this.state.connectToAzureActiveDirectory} onChange={this.onChangeInput} />
                    <label className="form-check-label">Connect to Azure Active Directory</label>
                </div>
                {this.state.connectToAzureActiveDirectory &&
                    <div className="mb-3">
                        <label className="form-label">Tenant ID</label>
                        <input type="text" className="form-control" name="tenantId" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={this.state.tenantId} onChange={this.onChangeInput} />
                    </div>
                }
                <div className="mb-3">
                    <label className="form-label">Users to add to the organization</label>
                    <input type="text" className="form-control" name="usersToAddToOrganiation" placeholder="user1@domain.com,user2@domain.com" value={this.state.usersToAddToOrganiation} onChange={this.onChangeInput} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Extensions to add to the organization</label>
                    <input type="text" className="form-control" name="extensionsToAddToOrganiation" placeholder="ms-devlabs.conflicts-tab,publisherid.extensionsid" value={this.state.extensionsToAddToOrganiation} onChange={this.onChangeInput} />
                </div>
            </div>
        )
    }
}