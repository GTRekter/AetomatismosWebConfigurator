import React, { Component } from 'react';
import './settings.css';

export default class OrganizationPoliciesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disallowThirdPartyApplicationAccessViaOauth: false,
            disallowSshAuthentication: false,
            logAuditEvents: true,
            allowPublicProjects: true,
            additionalProtectionsPublicPackageRegistries: true,
            enableAzureActiveDirectoryConditionalAccessPolicyValidation: true,
            disallowExternalGuestAccess: false,
            allowTeamAndProjectAdministratorsToInviteNewUsers: true,
            requestAccessEnable: false,
            requestAccessUrl: "https://dev.azure.com/GTRekter"      
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                disallowThirdPartyApplicationAccessViaOauth: this.props.settings.disallowThirdPartyApplicationAccessViaOauth || false,
                disallowSshAuthentication: this.props.settings.disallowSshAuthentication || false,
                logAuditEvents: this.props.settings.logAuditEvents || false,
                allowPublicProjects: this.props.settings.allowPublicProjects || false,
                additionalProtectionsPublicPackageRegistries: this.props.settings.additionalProtectionsPublicPackageRegistries || false,
                enableAzureActiveDirectoryConditionalAccessPolicyValidation: this.props.settings.enableAzureActiveDirectoryConditionalAccessPolicyValidation || false,
                disallowExternalGuestAccess: this.props.settings.disallowExternalGuestAccess || false,
                allowTeamAndProjectAdministratorsToInviteNewUsers: this.props.settings.allowTeamAndProjectAdministratorsToInviteNewUsers || false,
                requestAccessEnable: this.props.settings.requestAccessEnable || false,
                requestAccessUrl: this.props.settings.requestAccessUrl || false
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
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disallowThirdPartyApplicationAccessViaOauth" checked={this.state.disallowThirdPartyApplicationAccessViaOauth} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disallow third party applicationa ccess via OAuth</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disallowSshAuthentication" checked={this.state.disallowSshAuthentication} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disallow SSH Authorization</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="logAuditEvents" checked={this.state.logAuditEvents} onChange={this.onChangeInput} />
                    <label className="form-check-label">Log Audit Events</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="allowPublicProjects" checked={this.state.allowPublicProjects} onChange={this.onChangeInput} />
                    <label className="form-check-label">Allow Public Projects</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="additionalProtectionsPublicPackageRegistries" checked={this.state.additionalProtectionsPublicPackageRegistries} onChange={this.onChangeInput} />
                    <label className="form-check-label">Additional Protections Public Package Registries</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="enableAzureActiveDirectoryConditionalAccessPolicyValidation" checked={this.state.enableAzureActiveDirectoryConditionalAccessPolicyValidation} onChange={this.onChangeInput} />
                    <label className="form-check-label">Enable Azure Active Directory Conditional Access Policy Validation</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disallowExternalGuestAccess" checked={this.state.disallowExternalGuestAccess} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disallow External Guest Access</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="allowTeamAndProjectAdministratorsToInviteNewUsers" checked={this.state.allowTeamAndProjectAdministratorsToInviteNewUsers} onChange={this.onChangeInput} />
                    <label className="form-check-label">Allow Team And Project Administrators To Invite New Users</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="requestAccessEnable" checked={this.state.requestAccessEnable} onChange={this.onChangeInput} />
                    <label className="form-check-label">Request Access</label>
                </div>
                {!this.state.requestAccessEnable &&
                    <div className="mb-3">
                        <label className="form-label">Access Url</label>
                        <input type="text" className="form-control" name="requestAccessUrl" placeholder="https://dev.azure.com/Microsoft" value={this.state.requestAccessUrl} onChange={this.onChangeInput} />
                    </div>
                }
            </div>
        )
    }
}