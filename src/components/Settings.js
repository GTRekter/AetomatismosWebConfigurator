import React, { Component } from 'react';
import TemplateManagementService from '../services/TemplateManagementService';
import './settings.css';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // Organization general settings
            targetOrganizationName: '',
            connectToAzureActiveDirectory: false,
            tenantId: '',
            usersToAddToOrganiation: '',
            extensionsToAddToOrganiation: '',

            // Organization policies
            disallowThirdPartyAccessViaOauth: false,
            disallowSSHAuthentication: false,
            logAuditEvents: true,
            allowPublicProjects: true,
            additionalProtectionsPublicPackageRegistries: true,
            enableAzureActiveDirectoryConditionalAccessPolicyValidation: true,
            disallowExternalGuestAccess: false,
            allowTeamAndProjectAdministratorsToInviteNewUsers: true,
            requestAccessEnable: false,
            requestAccessUrl: "https://dev.azure.com/GTRekter",

            // Organization settings
            disableAnonymousAccessBadges: true,
            limitVariablesSetQueueTime: false,
            limitJobAuthorizationCurrentProjectNonReleasePipelines: false,
            limitJobAuthorizationCurrentProjectReleasePipelines: false,
            protectAccessRepositoriesYamlPipelines: false,
            disableStageChooser: false,
            disableCreationClassicBuildAndClassicReleasePipelines: false,
            disableBuiltInTasks: false,
            disableMarketplaceTasks: false,
            disableNodeSixTasks: false,

            // Repositories settings
            repositories: [],
            branches: [],

            // Pipelines settings
            serviceEndpoints: []        
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickExport = this.onClickExport.bind(this);
        this.onClickAddRepository = this.onClickAddRepository.bind(this);
        this.onClickRemoveRepository = this.onClickRemoveRepository.bind(this);
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onChangeRepositoryNameInput = (event) => {
        const target = event.target;
        const name = target.name;
        const { repositories } = this.state;
        const updatedRepositories = [...repositories];
        updatedRepositories[name].name = target.value;
        this.setState({
            repositories: updatedRepositories
        });
    }
    onChangeBranchNameInput = (event) => {
        const target = event.target;
        const name = target.name;
        const { branches } = this.state;
        const updatedBranches = [...branches];
        updatedBranches[name].name = target.value;
        this.setState({
            branches: updatedBranches
        });
    }
    onClickAddRepository = () => {
        const { repositories } = this.state;
        repositories.push({
            name: ''
        });
        this.setState({
            repositories: repositories
        });
    }
    onClickRemoveRepository = (index) => {
        const { repositories } = this.state;
        repositories.splice(index, 1);
        this.setState({
            repositories: repositories
        });
    }
    onClickAddBranch = () => {
        const { branches } = this.state;
        branches.push({
            name: ''
        });
        this.setState({
            branches: branches
        });
    }
    onClickRemoveBranch = (index) => {
        const { branches } = this.state;
        branches.splice(index, 1);
        this.setState({
            branches: branches
        });
    }
    onClickAddServiceEndpoint = () => {
        const { serviceEndpoints } = this.state;
        serviceEndpoints.push({
            name: ''
        });
        this.setState({
            serviceEndpoints: serviceEndpoints
        });
    }
    onClickExport = () => {
        const filename = 'organization.json';
        const templateManagementService = new TemplateManagementService(this.state, filename);
        templateManagementService.generateJson();
    }
    render() {
        return (
            <div className="full-height-container">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h1>Configure</h1>
                            <p>Welcome to a web-based application designed to simplify the management of Azure DevOps projects. This application features Bootstrap accordions to organize content, and provides comprehensive tools for configuring organization settings, policies, and connections to Azure, as well as managing repositories, pipelines, work items, and more specific to your project.</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h2>Organization</h2>
                            <p>The first section allows you to configure Azure DevOps organization settings, policies, and connections to Azure, providing comprehensive tools for managing your DevOps environment.</p>
                        </div>
                    </div>
                    <div className='row pb-5'>
                        <div className="accordion" id="organizationSettingsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="organizationGeneralSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#organizationGeneralSettingsCollapse" aria-expanded="false" aria-controls="organizationGeneralSettingsCollapse">
                                        Azure Active Directory, users and extensions
                                    </button>                   
                                </h2>
                                <div id="organizationGeneralSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="organizationGeneralSettingsHeader" data-bs-parent="#organizationSettingsAccordion">
                                    <div className="accordion-body">
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
                                </div>
                            </div> 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="organizationPoliciesHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#organizationPoliciesCollapse" aria-expanded="false" aria-controls="organizationPoliciesCollapse">
                                        Policies
                                    </button>                   
                                </h2>
                                <div id="organizationPoliciesCollapse" className="accordion-collapse collapse" aria-labelledby="organizationPoliciesHeader" data-bs-parent="#organizationSettingsAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disallowThirdPartyAccessViaOauth" checked={this.state.disallowThirdPartyAccessViaOauth} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Disallow third party applicationa ccess via OAuth</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disallowSSHAuthentication" checked={this.state.disallowSSHAuthentication} onChange={this.onChangeInput} />
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
                                </div>
                            </div> 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="organizationSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#organizationSettingsCollapse" aria-expanded="false" aria-controls="organizationSettingsCollapse">
                                        Settings
                                    </button>                   
                                </h2>
                                <div id="organizationSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="organizationSettingsHeader" data-bs-parent="#organizationSettingsAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disableAnonymousAccessBadges" checked={this.state.disableAnonymousAccessBadges} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Disable Anonymous Access Badges</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="limitVariablesSetQueueTime" checked={this.state.limitVariablesSetQueueTime} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Limit Variables Set Queue Time</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="limitJobAuthorizationCurrentProjectNonReleasePipelines" checked={this.state.limitJobAuthorizationCurrentProjectNonReleasePipelines} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Limit Job Authorization Current Project Non Release Pipelines</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="limitJobAuthorizationCurrentProjectReleasePipelines" checked={this.state.limitJobAuthorizationCurrentProjectReleasePipelines} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Limit Job Authorization Current Project Release Pipelines</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="protectAccessRepositoriesYamlPipelines" checked={this.state.protectAccessRepositoriesYamlPipelines} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Protect Access Repositories YAML Pipelines</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disableStageChooser" checked={this.state.disableStageChooser} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Disable Stage Chooser</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disableCreationClassicBuildAndClassicReleasePipelines" checked={this.state.disableCreationClassicBuildAndClassicReleasePipelines} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Disable Creation Classic Build And Classic Release Pipelines</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disableBuiltInTasks" checked={this.state.disableBuiltInTasks} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Disable BuiltIn Tasks</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disableMarketplaceTasks" checked={this.state.disableMarketplaceTasks} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Disable Marketplace Tasks</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" type="checkbox" name="disableNodeSixTasks" checked={this.state.disableNodeSixTasks} onChange={this.onChangeInput} />
                                            <label className="form-check-label">Disable Node Six Tasks</label>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h2>Project</h2>
                            <p>The second section provides configuration options for your Azure DevOps project, including repositories, pipelines, work items, and more, helping you manage your project with ease.</p>
                        </div>
                    </div>
                    <div className='row pb-5'>
                        <div className="accordion" id="projectSettingsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="repositoriesSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#repositoriesSettingsCollapse" aria-expanded="false" aria-controls="repositoriesSettingsCollapse">
                                        Repositories
                                    </button>                   
                                </h2>               
                                <div id="repositoriesSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="repositoriesSettingsHeader" data-bs-parent="#projectSettingsAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label className="form-label">Repositories name</label><br/>
                                            {this.state.repositories.map((repository, index) => {
                                                return (
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={repository.name} onChange={this.onChangeRepositoryNameInput} />         
                                                        </div>
                                                        <div className="col-2">
                                                            <button type="button" className="btn btn-danger" onClick={() => this.onClickRemoveRepository(index)}>Remove</button>
                                                        </div>
                                                    </div>     
                                                )
                                            })}
                                            <button type="button" className="btn btn-secondary" onClick={() => this.onClickAddRepository()}>Add repository</button>        
                                        </div>
                                    </div>
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label className="form-label">Branches name</label><br/>
                                            {this.state.branches.map((branch, index) => {
                                                return (
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={branch.name} onChange={this.onChangeBranchNameInput} />     
                                                        </div>
                                                        <div className="col-2">
                                                            <button type="button" className="btn btn-danger" onClick={() => this.onClickRemoveBranch(index)}>Remove</button>
                                                        </div>
                                                    </div>           
                                                )
                                            })}
                                            <button type="button" className="btn btn-secondary" onClick={() => this.onClickAddBranch()}>Add branch</button>        
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="pipelinesSettingsHeader">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#pipelinesSettingsCollapse" aria-expanded="true" aria-controls="pipelinesSettingsCollapse">
                                        Pipelines
                                    </button>                   
                                </h2>
                                <div id="pipelinesSettingsCollapse" className="accordion-collapse collapse show" aria-labelledby="pipelinesSettingsHeader" data-bs-parent="#projectSettingsAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label className="form-label">Service endpoints</label>
                                        
                                            <p>AzureRm service endpoints</p>
                                            {this.state.serviceEndpoints.map((serviceEndpoint, index) => {
                                                return (
                                                    <div>
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.name} onChange={this.onChangeServiceEndpointNameInput} />
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.subscriptionId} onChange={this.onChangeServiceEndpointSubscriptionIdInput} />
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.subscriptionName} onChange={this.onChangeServiceEndpointSubscriptionNameInput} />
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.tenantId} onChange={this.onChangeServiceEndpointTenantIdInput} />
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.servicePrincipalId} onChange={this.onChangeServiceEndpointServicePrincipalIdInput} />
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.servicePrincipalKey} onChange={this.onChangeServiceEndpointServicePrincipalKeyInput} />
                                                    </div>
                                                )
                                            })}
                                            <button type="button" className="btn btn-primary" onClick={() => this.onClickAddServiceEndpoint()}>Add serviceEndpoint</button>   
                                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>

                                            <p>GitHub service endpoints</p>
                                            {this.state.serviceEndpoints.map((serviceEndpoint, index) => {
                                                return (
                                                    <div>
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.name} onChange={this.onChangeServiceEndpointNameInput} />
                                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.githubConnectionName} onChange={this.onChangeServiceEndpointGithubConnectionNameInput} />
                                                    </div>
                                                )
                                            })}     
                                            <button type="button" className="btn btn-primary" onClick={() => this.onClickAddServiceEndpoint()}>Add serviceEndpoint</button>   

                                        </div>
                                    </div>
                                </div>
                            </div> 


                        </div>
                    </div>
                    <div className='row text-center pb-5'>
                        <div className='col-12 text-center'>
                            <button className='btn btn-light btn-lg' onClick={() => this.onClickStartBreak()}>Import</button>                   
                            <button className='btn btn-light btn-lg mx-2' onClick={() => this.onClickExport()}>Export</button>
                            <button className='btn btn-light btn-lg' onClick={() => this.onClickConfigure()}>Configure</button>
                        </div>
                    </div>
                </div>



                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}